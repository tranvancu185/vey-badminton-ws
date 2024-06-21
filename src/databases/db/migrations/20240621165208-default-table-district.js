'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    return await queryInterface.createTable('districts', {
      district_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      district_name: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      district_name_en: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      district_full_name: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      district_full_name_en: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      district_code_name: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      district_code: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      district_description: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      district_properties: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      city_id: {
        allowNull: true,
        type: Sequelize.INTEGER,
        references: {
          model: 'cities',
          key: 'city_id',
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        },
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
    await queryInterface.dropTable('districts');
  }
};
