'use strict',

  /** @type {import('sequelize-cli').Migration} */
  module.exports = {
    async up(queryInterface, Sequelize) {
      /**
       * Add altering commands here.
       *
       * Example:
       * await queryInterface.createTable('users', { id: Sequelize.INTEGER }),
       */
      return await queryInterface.createTable('customers', {
        customer_id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        customer_name: {
          allowNull: false,
          type: Sequelize.STRING,
        },
        customer_email: {
          allowNull: false,
          type: Sequelize.STRING,
        },
        customer_avatar: {
          allowNull: true,
          default: 'default.jpg',
          type: Sequelize.STRING,
        },
        customer_phone: {
          allowNull: false,
          unique: true,
          type: Sequelize.STRING,
        },
        customer_code: {
          allowNull: false,
          unique: true,
          type: Sequelize.STRING,
        },
        customer_status: {
          allowNull: true,
          default: 0,
          type: Sequelize.INTEGER,
        }, // 0: inactive, 1: active, 2: deleted
        customer_birthday: {
          allowNull: true,
          type: Sequelize.INTEGER,
        },
        customer_description: {
          allowNull: true,
          type: Sequelize.STRING,
        }, // text description of user
        customer_properties: {
          allowNull: true,
          type: Sequelize.STRING,
        }, // That is JSON string
        customer_config: {
          allowNull: true,
          default: 0,
          type: Sequelize.INTEGER,
        }, // That is bitwise value
        customer_password: {
          allowNull: false,
          type: Sequelize.STRING,
        },
        customer_full_address: {
          allowNull: true,
          default: null,
          type: Sequelize.STRING,
        },
        customer_detail_address: {
          allowNull: true,
          default: null,
          type: Sequelize.STRING,
        },
        customer_provide_id: {
          allowNull: true,
          default: null,
          type: Sequelize.INTEGER,
        },
        customer_district_id: {
          allowNull: true,
          default: null,
          type: Sequelize.INTEGER,
        },
        customer_ward_id: {
          allowNull: true,
          default: null,
          type: Sequelize.INTEGER,
        },
        customer_join_date: {
          allowNull: true,
          type: Sequelize.INTEGER
        },
        customer_deleted_at: {
          allowNull: true,
          type: Sequelize.INTEGER
        },
        customer_created_at: {
          allowNull: true,
          type: Sequelize.INTEGER
        },
        customer_updated_at: {
          allowNull: true,
          type: Sequelize.INTEGER
        },
      });
    },

    async down(queryInterface, Sequelize) {
      /**
       * Add reverting commands here.
       *
       * Example:
       * await queryInterface.dropTable('users'),
       */
      await queryInterface.dropTable('customers');
    }
  };
