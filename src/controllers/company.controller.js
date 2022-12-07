const Company = require("../models/Company");

module.exports = {
  async update(req, res) {
    const { id, truedesk_id } = req.body;
    const company = await Company.findByPk(id);
    await company.update({ truedesk_id });
    if (!company) {
      return res.status(500).json({ error: "Usuário não encontrado" });
    }
    return res.status(200).json(company.truedesk_id);
  },
};
