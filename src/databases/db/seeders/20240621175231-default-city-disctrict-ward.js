'use strict';
const fs = require('fs');
const path = require('path');
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
    const seedData = JSON.parse(
      fs.readFileSync(path.join(__dirname, 'data', 'json_data_vn_units.json'), 'utf8')
    );

    for (const cityData of seedData) {
      const city = await queryInterface.bulkInsert('cities', [{
        city_name: cityData.Name,
        city_name_en: cityData.NameEn,
        city_full_name: cityData.FullName,
        city_full_name_en: cityData.FullNameEn,
        city_code: cityData.Code,
        city_code_name: cityData.CodeName,
      }], { returning: true }); // Trả về ID của city đã được tạo
      console.log('city - ID: ', city);
      const cityId = city; // Lấy city_id từ kết quả bulkInsert

      if (cityData.District) {
        for (const districtData of cityData.District) {
          const district = await queryInterface.bulkInsert('districts', [{
            district_name: districtData.Name,
            district_name_en: districtData.NameEn,
            district_full_name: districtData.FullName,
            district_full_name_en: districtData.FullNameEn,
            district_code: districtData.Code,
            district_code_name: districtData.CodeName,
            city_id: cityId, // Sử dụng city_id đã lấy được ở trên
          }], { returning: true }); // Trả về ID của district đã được tạo
          console.log('district - ID: ', district);
          const districtId = district; // Lấy district_id từ kết quả bulkInsert

          if (districtData.Ward) {
            for (const wardData of districtData.Ward) {
              await queryInterface.bulkInsert('wards', [{
                ward_name: wardData.Name,
                ward_name_en: wardData.NameEn,
                ward_full_name: wardData.FullName,
                ward_full_name_en: wardData.FullNameEn,
                ward_code: wardData.Code,
                ward_code_name: wardData.CodeName,
                district_id: districtId, // Sử dụng district_id đã lấy được ở trên
                city_id: cityId,        // Sử dụng city_id đã lấy được ở trên
              }]);
            }
          }
        }
      }
    }
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('cities', null, {});
    await queryInterface.bulkDelete('districts', null, {});
    await queryInterface.bulkDelete('wards', null, {});
  }
};
