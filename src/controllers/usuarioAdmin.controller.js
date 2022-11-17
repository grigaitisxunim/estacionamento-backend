const User = require("../models/User");
const jwt = require("jsonwebtoken");
const secret = process.env.jwt_secret;

module.exports = {
  async update(req, res) {
    const { id, active } = req.body;
    const user = await User.findByPk(id);
    await user.update({ active });
    return res.json(req.body);
  },
};
