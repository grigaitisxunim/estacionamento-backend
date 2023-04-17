const Veiculos = require("../models/Veiculos");
const Index = require("../database/index");

module.exports = {
  async index(req, res) {
    const veiculos = await Veiculos.findAll();
    res.json(veiculos);
  },
  async create(req, res) {
    try {
      const {placa, marca, modelo, cor, tipo } = req.body;
      let veiculos = await Veiculos.findOne({ where: { placa } });
    
      if (veiculos) {
        res
          .status(500)
          .json({ erro: "Esse veiculo já está cadastrado!" }, veiculos);
      }
    
      if (!veiculos) {
        veiculos = await Veiculos.create({ ...req.body});
        return res.status(200).json({
          ...veiculos.dataValues
        });
      } else {
        return res
          .status(500)
          .json({ error: "Não foi possivel cadastrar este veiculo!" }, veiculos);
      }
    } catch (error) {
      console.log(error);
      res.sendStatus(500).json({ error: "Erro inesperado" }, error);
    }
  },
  async details(req, res) {
    const { placa } = req.params;
    const veiculos = await Veiculos.findOne(placa);
    if (!veiculos) {
      return res.status(500).json({ error: "Veiculo não encontrado" });
    }
    return res.status(200).json(veiculos);
  },
  async delete(req, res) {
    const { id } = req.params;
    const veiculos = await Veiculos.destroy({ where: { id } });
    if (!veiculos) {
      return res.status(500).json({ error: "Veiculo não encontrado" });
    }
    return res.status(200).json(veiculos +  " excluído com sucesso");
  },
  async update(req, res) {
    const {id, placa, marca, modelo, cor, tipo} = req.body;
    const veiculos = await Veiculos.findByPk(id);
    await veiculos.update({ placa, marca, modelo, cor, tipo });
    if (!veiculos) {
      return res.status(500).json({ error: "Usuário não encontrado" });
    }
    return res.json(veiculos);
  },
};
