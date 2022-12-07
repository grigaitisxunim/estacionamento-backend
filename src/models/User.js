const Sequelize = require("sequelize");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

class User extends Sequelize.Model {
  static init(sequelize) {
    super.init(
      {
        username: Sequelize.STRING,
        full_name: Sequelize.STRING,
        email: Sequelize.STRING,
        active: Sequelize.BOOLEAN,
        password: Sequelize.VIRTUAL,
        last_login: Sequelize.DATE,
        password_hash: Sequelize.STRING,
        register_date: Sequelize.DATE,
        user_type_id: Sequelize.INTEGER,
        truedesk_id: Sequelize.STRING,
      },
      { sequelize }
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
    this.belongsTo(models.Company, {
      foreignKey: "company_id",
      as: "company",
    });
  }

  checkPassword(password) {
    return bcrypt.compare(password, this.password_hash);
  }

  async generateToken(expiresIn = "1d") {
    const token = jwt.sign(
      {
        id: this.id,
        full_name: this.full_name,
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

module.exports = User;
