const Sequelize = require("sequelize");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

class Estabelecimento extends Sequelize.Model {
  static init(sequelize) {
    super.init(
      {
        username: Sequelize.STRING,
        cnpj: Sequelize.STRING,
        endereco: Sequelize.STRING,
        tel: Sequelize.STRING,
        qtd_vagas_moto: Sequelize.STRING,
        qtd_vagas_car: Sequelize.STRING,
        active: Sequelize.BOOLEAN,
        password: Sequelize.VIRTUAL,
        last_login: Sequelize.DATE,
        password_hash: Sequelize.STRING,
        register_date: Sequelize.DATE,
        user_type_id: Sequelize.INTEGER,
      },
      { sequelize,
      tableName: 'estabelecimento'}
    );

    this.addHook("beforeSave", async (user) => {
      if (user.password)
        user.password_hash = await bcrypt.hash(user.password, 8);
    });

    return this;
  }

  static associate(models) {
    this.belongsTo(models.UserType, {
      foreignKey: "user_type_id",
      as: "user_type",
    });
    this.belongsTo(models.Veiculos, {
      foreignKey: "veiculo_id",
      as: "veiculo",
    });
    this.hasMany(models.Veiculos, { as: "veiculos" });
  }

  checkPassword(password) {
    return bcrypt.compare(password, this.password_hash);
  }

  async generateToken(expiresIn = "1d") {
    const token = jwt.sign(
      {
        id: this.id,
        username: this.username,
        cnpj:this.cnpj,
        user_type_id: this.user_type_id,
        level: this.level,
      },
      process.env.jwt_secret,
      { expiresIn }
    );

    await this.update({
      last_login: new Date(),
    });

    return token;
  }
}

module.exports = Estabelecimento;
