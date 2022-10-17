const Sequelize = require("sequelize");
const dbConfig = require("../config/database");
const Company = require("../models/Company");
const User = require("../models/User");
const UserType = require("../models/UserType");

const models = [UserType, User, Company];

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
