"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.addColumn("users", "company_id", {
      type: Sequelize.INTEGER,
        references: { model: "companies", key: "id" },
        allowNull: false,
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
       });
  },

  down: async (queryInterface, Sequelize) => {
    return await queryInterface.removeColumn("users", "company_id");
  },
};