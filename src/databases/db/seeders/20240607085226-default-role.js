'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    const roles = [
      {
        role_name: 'superadmin',
        role_description: 'superadmin',
        role_code: 'superadmin.role',
      }, {
        role_name: 'admin',
        role_description: 'admin',
        role_code: 'admin.role',
      }, {
        role_name: 'user',
        role_description: 'user',
        role_code: 'user.role',
      },
      {
        role_name: 'guest',
        role_description: 'guest',
        role_code: 'guest.role',
      },
      {
        role_name: 'partner',
        role_description: 'partner',
        role_code: 'partner.role',
      },
      {
        role_name: 'customer',
        role_description: 'customer',
        role_code: 'customer.role',
      },
    ];
    await queryInterface.bulkInsert('roles', roles, {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('roles', null, {});
  }
};
