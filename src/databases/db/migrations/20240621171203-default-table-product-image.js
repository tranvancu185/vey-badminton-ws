'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    return await queryInterface.createTable('product_images', {
      product_image_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      product_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'products',
          key: 'product_id',
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        },
      },
      product_image: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      product_image_description: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      product_image_note: {
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
    await queryInterface.dropTable('product_images');
  }
};
