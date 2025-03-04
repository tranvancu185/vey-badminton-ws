'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    return await queryInterface.createTable('products', {
      product_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      product_sku: {
        allowNull: false,
        type: Sequelize.STRING,
        index: true,
      },
      product_barcode: {
        allowNull: false,
        type: Sequelize.STRING,
        index: true,
      },
      product_name: {
        allowNull: false,
        type: Sequelize.STRING,
        index: true
      },
      product_manufactor_name: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      product_description: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      product_properties: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      product_price: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      product_config: {
        allowNull: false,
        default: 0,
        type: Sequelize.INTEGER,
      },
      product_type: {
        allowNull: false,
        default: 0,
        type: Sequelize.INTEGER,
      },
      product_brand_id: {
        allowNull: true,
        type: Sequelize.INTEGER,
      },
      product_status: {
        allowNull: false,
        default: 0,
        type: Sequelize.INTEGER,
      },
      product_created_at: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      product_updated_at: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      product_deleted_at: {
        allowNull: true,
        type: Sequelize.INTEGER,
      },
      product_availability: {
        allowNull: true,
        type: Sequelize.INTEGER,
      },
      product_rating: {
        allowNull: true,
        type: Sequelize.INTEGER,
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
    await queryInterface.dropTable('products');
  }
};
