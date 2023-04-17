"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.addColumn("estabelecimento", "veiculo_id", {
      type: Sequelize.INTEGER,
        references: { model: "veiculos", key: "id" },
        allowNull: true,
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
       });
  },

  down: async (queryInterface, Sequelize) => {
    return await queryInterface.removeColumn("estabelecimento", "veiculo_id");
  },
};