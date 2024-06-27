'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    return await queryInterface.createTable('warehouses', {
      warehouse_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      warehouse_name: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      warehouse_code: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      warehouse_description: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      warehouse_properties: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      store_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable('warehouses');
  }
};
