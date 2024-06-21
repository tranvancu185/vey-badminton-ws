'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    return await queryInterface.createTable('vendors', {
      vendor_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      vendor_name: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      vendor_code: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      vendor_description: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      vendor_properties: {
        allowNull: true,
        type: Sequelize.STRING,
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable('vendors');
  }
};
