const Estabelecimento = require("../models/Estabelecimento");
const jwt = require("jsonwebtoken");
const secret = process.env.jwt_secret;

module.exports = {
  async update(req, res) {
    const { id, active } = req.body;
    const estabelecimento = await Estabelecimento.findByPk(id);
    await estabelecimento.update({ active });
    return res.json(req.body);
  },
};
