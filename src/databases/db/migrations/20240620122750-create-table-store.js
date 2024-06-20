'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    return await queryInterface.createTable('stores', {
      store_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      store_name: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      store_code: {
        allowNull: false,
        unique: true,
        type: Sequelize.STRING,
      },
      store_status: {
        allowNull: true,
        default: 0,
        type: Sequelize.INTEGER,
      }, // 0: inactive, 1: active, 2: deleted
      store_description: {
        allowNull: true,
        type: Sequelize.STRING,
      }, // text description of user
      store_properties: {
        allowNull: true,
        type: Sequelize.STRING,
      }, // That is JSON string
      store_config: {
        allowNull: true,
        default: 0,
        type: Sequelize.INTEGER,
      }, // That is bitwise value
      store_full_address: {
        allowNull: true,
        default: null,
        type: Sequelize.STRING,
      },
      store_detail_address: {
        allowNull: true,
        default: null,
        type: Sequelize.STRING,
      },
      store_provice_id: {
        allowNull: true,
        default: null,
        type: Sequelize.INTEGER,
      },
      store_district_id: {
        allowNull: true,
        default: null,
        type: Sequelize.INTEGER,
      },
      store_ward_id: {
        allowNull: true,
        default: null,
        type: Sequelize.INTEGER,
      },
      store_deleted_at: {
        allowNull: true,
        type: Sequelize.INTEGER
      },
      store_created_at: {
        allowNull: true,
        type: Sequelize.INTEGER
      },
      store_updated_at: {
        allowNull: true,
        type: Sequelize.INTEGER
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
    await queryInterface.dropTable('stores');
  }
};
