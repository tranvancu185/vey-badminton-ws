'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    return await queryInterface.createTable('cities', {
      city_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      city_name: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      city_name_en: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      city_full_name: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      city_full_name_en: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      city_code_name: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      city_code: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      city_description: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      city_properties: {
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
    await queryInterface.dropTable('cities');
  }
};
