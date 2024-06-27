'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    return await queryInterface.createTable('wards', {
      ward_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      ward_name: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      ward_name_en: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      ward_full_name: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      ward_full_name_en: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      ward_code_name: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      ward_code: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      ward_description: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      ward_properties: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      district_id: {
        allowNull: true,
        type: Sequelize.INTEGER,
        references: {
          model: 'districts',
          key: 'district_id',
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
        },
      },
      city_id: {
        allowNull: true,
        type: Sequelize.INTEGER,
        references: {
          model: 'cities',
          key: 'city_id',
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
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
    await queryInterface.dropTable('wards');
  }
};
