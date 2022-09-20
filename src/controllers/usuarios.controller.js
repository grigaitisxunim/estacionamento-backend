const User = require("../models/User");
const jwt = require("jsonwebtoken");
const Company = require("../models/Company");
const secret = process.env.jwt_secret

module.exports = {
  async index(req, res) {
    const user = await User.findAll();
    res.json(user);
  },
  async create(req, res) {
    const { email, company_name } = req.body;
    let user = await User.findOne({ where: { email } });
    let company = await Company.findOne({ where: { name: company_name } });
    let company_created;

    if (!company) {
      company = await Company.create({ name: company_name });
      company_created = true;
    }
    if (!user) {
      delete req.body.company_name;
      user = await User.create({ ...req.body, company_id: company.id });
      delete user.dataValues.password;

      if (company_created) {
        await company.update({ user_id: user.id });
      }
      return res.status(200).json(user);
    } else {
      return res.status(500).json(user);
    }
  },
  async details(req, res) {
    const { id } = req.params;
    const user = await User.findByPk(id, {
      include: [{model:Company, as:"company", attributes:["name"]}]  
    });
    return res.json(user);

  },
  async delete(req, res) {
    const { id } = req.params;
    const user = await User.destroy({ where: { id } });
    delete user.password;
    return res.json(user);
  },
  async update(req, res) {
    const {id, full_name, email, active} = req.body;
    const user = await User.findByPk(id);
    await user.update({full_name, email, active});
    return res.json(req.body);
  },
  async login(req, res) {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email, active: true } });
    if (!(await user.checkPassword(password))) {
      return res.status(500).json({ Error: "Usuario o senha incorretos!" });
    }
    const token = await user.generateToken();
    return res.json({ token });
  }
};
