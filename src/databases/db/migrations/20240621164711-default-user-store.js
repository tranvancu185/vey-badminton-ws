'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    return await queryInterface.createTable('user_stores', {
      user_store_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      user_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'users',
          key: 'user_id',
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        },
      },
      store_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'stores',
          key: 'store_id',
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        },
      },
      user_store_role: {
        allowNull: false,
        default: 0,
        type: Sequelize.INTEGER,
      }, // 0: READ, 1: WRITE, 2: BOTH
    });
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable('user_stores');
  }
};
