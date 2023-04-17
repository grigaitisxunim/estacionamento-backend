const Sequelize = require("sequelize");

class Veiculos extends Sequelize.Model {
  static init(sequelize) {
    super.init(
      {
        placa: Sequelize.STRING,
        marca: Sequelize.STRING,
        modelo: Sequelize.STRING,
        cor: Sequelize.STRING,
        tipo: Sequelize.STRING,
      },
      { sequelize }
    );
        return this;
  }

  static associate(models) {
    this.belongsTo(models.Estabelecimento, {
      foreignKey: "estabelecimento_id",
      as: "Estabelecimento",
    });
    this.hasMany(models.Estabelecimento, { as: "estabelecimento" });
  }

 
}

module.exports = Veiculos;
