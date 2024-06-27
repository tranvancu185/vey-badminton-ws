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
      return await queryInterface.createTable('users', {
        user_id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        user_name: {
          allowNull: false,
          type: Sequelize.STRING,
        },
        user_email: {
          allowNull: true,
          unique: true,
          type: Sequelize.STRING,
        },
        user_avatar: {
          allowNull: true,
          default: 'default.jpg',
          type: Sequelize.STRING,
        },
        user_phone: {
          allowNull: false,
          unique: true,
          type: Sequelize.STRING,
        },
        user_code: {
          allowNull: false,
          unique: true,
          type: Sequelize.STRING,
        },
        user_status: {
          allowNull: true,
          default: 0,
          type: Sequelize.INTEGER,
        }, // 0: inactive, 1: active, 2: deleted
        user_birthday: {
          allowNull: true,
          type: Sequelize.INTEGER,
        },
        user_description: {
          allowNull: true,
          type: Sequelize.STRING,
        }, // text description of user
        user_properties: {
          allowNull: true,
          type: Sequelize.STRING,
        }, // That is JSON string
        user_config: {
          allowNull: true,
          default: 0,
          type: Sequelize.INTEGER,
        }, // That is bitwise value
        user_password: {
          allowNull: false,
          type: Sequelize.STRING,
        },
        user_full_address: {
          allowNull: true,
          default: null,
          type: Sequelize.STRING,
        },
        user_detail_address: {
          allowNull: true,
          default: null,
          type: Sequelize.STRING,
        },
        user_provice_id: {
          allowNull: true,
          default: null,
          type: Sequelize.INTEGER,
        },
        user_district_id: {
          allowNull: true,
          default: null,
          type: Sequelize.INTEGER,
        },
        user_ward_id: {
          allowNull: true,
          default: null,
          type: Sequelize.INTEGER,
        },
        user_role_id: {
          allowNull: true,
          default: 0,
          type: Sequelize.INTEGER,
        },
        user_department_id: {
          allowNull: true,
          default: null,
          type: Sequelize.INTEGER,
        },
        user_position_id: {
          allowNull: true,
          default: null,
          type: Sequelize.INTEGER,
        },
        user_create_by: {
          allowNull: true,
          type: Sequelize.INTEGER,
        }, // user_id of user who create this user

        user_join_date: {
          allowNull: true,
          type: Sequelize.INTEGER
        },
        user_deleted_at: {
          allowNull: true,
          type: Sequelize.INTEGER
        },
        user_created_at: {
          allowNull: true,
          type: Sequelize.INTEGER
        },
        user_updated_at: {
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
      await queryInterface.dropTable('users');
    }
  };
