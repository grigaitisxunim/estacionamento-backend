const User = require("../models/User");
const jwt = require("jsonwebtoken");
const Company = require("../models/Company");
const secret = process.env.jwt_secret;
const Index = require("../database/index");

module.exports = {
  async index(req, res) {
    const user = await User.findAll();
    res.json(user);
  },
  async create(req, res) {
    try {
      const { email, company_name } = req.body;
      let user = await User.findOne({ where: { email } });
      if (user) {
        res.status.json();
      }
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
        return res
          .status(500)
          .json({ error: "Não foi possivel criar este usuário!" }, user);
      }
    } catch (error) {
      console.log(error);
      res.sendStatus(500).json({ error: "Erro inesperado" }, error);
    }
  },
  async details(req, res) {
    const { id } = req.params;
    const user = await User.findByPk(id, {
      include: [{ model: Company, as: "company", attributes: ["name"] }],
    });
    if (!user) {
      return res.status(500).json({ error: "Usuário não encontrado" });
    }
    return res.json(user);
  },
  async delete(req, res) {
    const { id } = req.params;
    const user = await User.destroy({ where: { id } });
    delete user.password;
    if (!user) {
      return res.status(500).json({ error: "Usuário não encontrado" });
    }
    return res.json(user);
  },
  async update(req, res) {
    const { id, full_name, email, active } = req.body;
    const user = await User.findByPk(id);
    await user.update({ full_name, email, active });
    if (!user) {
      return res.status(500).json({ error: "Usuário não encontrado" });
    }
    return res.json(req.body);
  },
  async login(req, res) {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email, active: true } });
    if (!user) return res.status(500).json({ error: "Usuário incorreto!" });
    if (!(await user.checkPassword(password))) {
      return res.status(500).json({ error: "Usuario ou senha incorretos!" });
    }
    const token = await user.generateToken();
    return res.json({ token });
  },
  async health(req, res) {
    const health = await Index.init();
    console.log(health);
    if (health) {
      return res.status(200).json({ status: "Banco no ar!" });
    }
    return res.status(500).json({ status: "Banco Fora do ar!" });
  },
};
