'use strict';

/** @type {import('sequelize-cli').Migration} */
  module.exports = {
    up: async (queryInterface, Sequelize) => {
      await queryInterface.addColumn("Customers", "email", {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      });
    },
    down: async (queryInterface, Sequelize) => {
      await queryInterface.removeColumn("Customers", "email");
    },
  };
  
