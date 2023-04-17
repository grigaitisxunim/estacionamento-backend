const Sequelize = require("sequelize");
const dbConfig = require("../config/database");
const Estabelecimento = require("../models/Estabelecimento");
const UserType = require("../models/UserType");
const Veiculos = require("../models/Veiculos");

const models = [UserType, Estabelecimento, Veiculos];

class Database {
  constructor() {
    this.init();
  }

  async init() {
    try {
      this.connection = new Sequelize(dbConfig);

      models
        .map((model) => model.init(this.connection))
        .map(
          (model) => model.associate && model.associate(this.connection.models)
        );
      const teste = await this.connection.query("SELECT 1");

      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  }
}
module.exports = new Database();
