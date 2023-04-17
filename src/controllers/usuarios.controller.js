const Estabelecimento = require("../models/Estabelecimento.js");
const Index = require("../database/index");

module.exports = {
  async index(req, res) {
    const estabelecimento = await Estabelecimento.findAll();
    res.json(estabelecimento);
  },
  async create(req, res) {
    try {
      const {username, cnpj, endereco, tel, qtd_vagas_moto, qtd_vagas_car } = req.body;
      let estabelecimento = await Estabelecimento.findOne({ where: { username } });
      let estabelecimenton = await Estabelecimento.findOne({ where: { cnpj } });
      if (estabelecimento || estabelecimenton) {
        res
          .status(500)
          .json({ erro: "Esse nome de usuário ou CNPJ já está sendo usado!" });
      }
    
      if (!estabelecimento || !estabelecimenton) {
        estabelecimento = await Estabelecimento.create({ ...req.body});
        delete estabelecimento.dataValues.password;
        delete estabelecimento.dataValues.password_hash;


        return res.status(200).json({
          ...estabelecimento.dataValues
        });
      } else {
        return res
          .status(500)
          .json({ error: "Não foi possivel criar este usuário!" }, estabelecimento);
      }
    } catch (error) {
      console.log(error);
      res.sendStatus(500).json({ error: "Erro inesperado" }, error);
    }
  },
  async details(req, res) {
    const { id } = req.params;
    const estabelecimento = await Estabelecimento.findByPk(id);
    if (!estabelecimento) {
      return res.status(500).json({ error: "Usuário não encontrado" });
    }
    return res.status(200).json(estabelecimento);
  },
  async delete(req, res) {
    const { id } = req.params;
    const estabelecimento = await Estabelecimento.destroy({ where: { id } });
    delete estabelecimento.password;
    if (!estabelecimento) {
      return res.status(500).json({ error: "Usuário não encontrado" });
    }
    return res.status(200).json(estabelecimento +  " excluído com sucesso");
  },
  async update(req, res) {
    const {id, username, cnpj, endereco, tel, qtdVagasMoto, qtdVagasCar , active} = req.body;
    const estabelecimento = await Estabelecimento.findByPk(id);
    await estabelecimento.update({ username, cnpj, endereco, tel, qtdVagasMoto, qtdVagasCar , active});
    if (!estabelecimento) {
      return res.status(500).json({ error: "Usuário não encontrado" });
    }
    return res.json(estabelecimento);
  },
  async login(req, res) {
    const { username, password } = req.body;
    const estabelecimento = await Estabelecimento.findOne({ where: { username, active: true } });
    if (!estabelecimento)
      return res.status(500).json({ error: "Usuário ou senha incorretos!" });
    if (!(await estabelecimento.checkPassword(password))) {
      return res.status(500).json({ error: "Usuario ou senha incorretos!" });
    }
    const token = await estabelecimento.generateToken();
    //console.log(orgId);
    return res.json({ token, username });
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
