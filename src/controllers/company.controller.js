const Company = require("../models/Company");

module.exports = {
  async update(req, res) {
    const { id, name, truedesk_id } = req.body;
    const company = await Company.findByPk(id);
    await company.update({ truedesk_id });
    if (!company) {
      return res.status(500).json({ error: "Usuário não encontrado" });
    }
    return res.json(req.body);
  },
};
