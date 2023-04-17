"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("estabelecimento", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      username: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
      },
      cnpj: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      endereco: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
      },
      tel: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
      },
      qtd_vagas_moto: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
      },
      qtd_vagas_car: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
      },
      password_hash: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      active: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
        allowNull: false,
      },
      last_login: {
        type: Sequelize.DATE,
      },
      register_date: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      user_type_id: {
        type: Sequelize.INTEGER,
        references: { model: "user_types", key: "id" },
        defaultValue: 2,
        allowNull: false,
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      created_at: {
        type: Sequelize.DATE,
        defaultValue: new Date(),
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        defaultValue: new Date(),
        allowNull: false,
      }
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("estabelecimentos");
  },
};
