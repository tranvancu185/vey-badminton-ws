'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    return await queryInterface.createTable('vouchers', {
      voucher_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      voucher_code: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      voucher_serial: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      voucher_name: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      voucher_description: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      voucher_properties: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      voucher_discount: {
        allowNull: true,
        type: Sequelize.INTEGER,
      },
      voucher_start_date: {
        allowNull: true,
        type: Sequelize.INTEGER,
      },
      voucher_end_date: {
        allowNull: true,
        type: Sequelize.INTEGER,
      },
      voucher_status: {
        allowNull: true,
        type: Sequelize.INTEGER,
      },
      voucher_created_at: {
        allowNull: true,
        type: Sequelize.INTEGER,
      },
      voucher_updated_at: {
        allowNull: true,
        type: Sequelize.INTEGER,
      },
      voucher_deleted_at: {
        allowNull: true,
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
    await queryInterface.dropTable('vouchers');
  }
};
