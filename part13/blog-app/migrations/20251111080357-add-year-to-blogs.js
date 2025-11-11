"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("blogs", "year", {
      type: Sequelize.INTEGER,
      allowNull: true, // Allow null for existing records
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("blogs", "year");
  },
};
