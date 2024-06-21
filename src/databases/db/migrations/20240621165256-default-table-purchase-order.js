'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    // return await queryInterface.createTable('purchase_order', {
    //   purchase_order_id: {
    //     allowNull: false,
    //     autoIncrement: true,
    //     primaryKey: true,
    //     type: Sequelize.INTEGER,
    //   },
    //   purchase_order_number: {
    //     allowNull: false,
    //     type: Sequelize.STRING,
    //   },
    //   purchase_order_code: {
    //     allowNull: false,
    //     type: Sequelize.STRING,
    //   },
    //   purchase_order_date: {
    //     allowNull: false,
    //     type: Sequelize.INTEGER,
    //   },
    //   purchase_order_status: {
    //     allowNull: false,
    //     type: Sequelize.STRING,
    //   },
    //   purchase_order_description: {
    //     allowNull: true,
    //     type: Sequelize.STRING,
    //   },
    //   purchase_order_properties: {
    //     allowNull: true,
    //     type: Sequelize.STRING,
    //   },
    //   purchase_order_created_at: {
    //     allowNull: false,
    //     type: Sequelize.INTEGER,
    //   },
    //   purchase_order_updated_at: {
    //     allowNull: false,
    //     type: Sequelize.INTEGER,
    //   },
    //   purchase_order_deleted_at: {
    //     allowNull: true,
    //     type: Sequelize.INTEGER,
    //   },
    //   vendor_id: {
    //     allowNull: false,
    //     type: Sequelize.INTEGER,
    //     references: {
    //       model: 'vendors',
    //       key: 'vendor_id',
    //     },
    //     onUpdate: 'CASCADE',
    //     onDelete: 'CASCADE',
    //   },
    //   user_id: {
    //     allowNull: false,
    //     type: Sequelize.INTEGER,
    //     references: {
    //       model: 'users',
    //       key: 'user_id',
    //     },
    //     onUpdate: 'CASCADE',
    //     onDelete: 'CASCADE',
    //   },
    //   warehouse_id: {
    //     allowNull: false,
    //     type: Sequelize.INTEGER,
    //     references: {
    //       model: 'warehouse',
    //       key: 'warehouse_id',
    //     },
    //     onUpdate: 'CASCADE',
    //     onDelete: 'CASCADE',
    //   },
    // });
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    // await queryInterface.dropTable('purchase_order');
  }
};
