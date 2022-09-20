const Sequelize = require("sequelize");

class UserType extends Sequelize.Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        level: Sequelize.INTEGER,
      },
      { sequelize }
    );
    return this;
  }
}

module.exports = UserType;