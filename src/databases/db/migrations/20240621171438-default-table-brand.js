'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    return await queryInterface.createTable('brands', {
      brand_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      brand_name: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      brand_code: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      brand_description: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      brand_properties: {
        allowNull: true,
        type: Sequelize.STRING,
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
    await queryInterface.dropTable('brands');
  }
};
