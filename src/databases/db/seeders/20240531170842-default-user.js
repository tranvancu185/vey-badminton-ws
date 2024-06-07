'use strict';
const bcrypt = require('bcrypt'); // Thư viện mã hóa mật khẩu

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
    require('dotenv').config();

    const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);

    await queryInterface.bulkInsert('users', [
      {
        user_name: 'ADMIN',
        user_email: process.env.ADMIN_EMAIL || 'admin_vey@ume.com',
        user_avatar: 'default.jpg',
        user_phone: process.env.ADMIN_PHONE || '0965135278',
        user_code: 'ADMIN-vey',
        user_status: 1,
        user_birthday: null,
        user_description: 'Super Administrator',
        user_properties: JSON.stringify({}),
        user_config: 0,
        user_password: hashedPassword,
        user_role_id: 1, // Giả sử 1 là role của admin
        user_department_id: null,
        user_position_id: null,
        user_create_by: null,
        user_full_address: null,
        user_detail_address: null,
        user_provice_id: null,
        user_district_id: null,
        user_ward_id: null,
        user_join_date: Math.floor(Date.now() / 1000),
        user_deleted_at: null,
        user_created_at: Math.floor(Date.now() / 1000),
        user_updated_at: Math.floor(Date.now() / 1000),
      },
      {
        user_name: 'Trần Phú Quý',
        user_email: process.env.ADMIN_EMAIL || 'quytp@ume.com',
        user_avatar: 'default.jpg',
        user_phone: process.env.ADMIN_PHONE || '0797559163',
        user_code: 'quytp',
        user_status: 1,
        user_birthday: null,
        user_description: 'Trần Phú Quý - Vey',
        user_properties: JSON.stringify({}),
        user_config: 0,
        user_password: hashedPassword,
        user_role_id: 3,
        user_department_id: null,
        user_position_id: null,
        user_create_by: null,
        user_full_address: null,
        user_detail_address: null,
        user_provice_id: null,
        user_district_id: null,
        user_ward_id: null,
        user_join_date: Math.floor(Date.now() / 1000),
        user_deleted_at: null,
        user_created_at: Math.floor(Date.now() / 1000),
        user_updated_at: Math.floor(Date.now() / 1000),
      },
      {
        user_name: 'Ngô Hữu Cảnh',
        user_email: process.env.ADMIN_EMAIL || 'canhnh@ume.com',
        user_avatar: 'default.jpg',
        user_phone: process.env.ADMIN_PHONE || '0902733336',
        user_code: 'canhnh',
        user_status: 1,
        user_birthday: null,
        user_description: 'Ngô Hữu Cảnh - canh',
        user_properties: JSON.stringify({}),
        user_config: 0,
        user_password: hashedPassword,
        user_role_id: 3,
        user_department_id: null,
        user_position_id: null,
        user_create_by: null,
        user_full_address: null,
        user_detail_address: null,
        user_provice_id: null,
        user_district_id: null,
        user_ward_id: null,
        user_join_date: Math.floor(Date.now() / 1000),
        user_deleted_at: null,
        user_created_at: Math.floor(Date.now() / 1000),
        user_updated_at: Math.floor(Date.now() / 1000),
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('users', null, {});
  }
};
