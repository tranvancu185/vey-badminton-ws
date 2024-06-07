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

    // src/configs/swagger/schemas/params/index.js

    const userPermissions = [
      {
        permission_name: 'Xem danh sách người dùng',
        permission_partten: '/users',
        permission_description: 'Cho phép xem danh sách tất cả người dùng trong hệ thống, bao gồm thông tin cơ bản như tên, email và vai trò.',
        permission_code: 'users_list',
      },
      {
        permission_name: 'Tạo người dùng mới',
        permission_partten: '/users',
        permission_description: 'Cho phép tạo một người dùng mới trong hệ thống với các thông tin cần thiết như tên, email, mật khẩu, và vai trò.',
        permission_code: 'users_create',
      },
      {
        permission_name: 'Chỉnh sửa thông tin người dùng',
        permission_partten: '/users',
        permission_description: 'Cho phép chỉnh sửa thông tin cá nhân của người dùng hiện có, bao gồm tên, email, mật khẩu và vai trò.',
        permission_code: 'users_edit',
      },
      {
        permission_name: 'Xóa người dùng',
        permission_partten: '/users',
        permission_description: 'Cho phép xóa một người dùng khỏi hệ thống. Lưu ý rằng việc xóa người dùng có thể ảnh hưởng đến dữ liệu liên quan.',
        permission_code: 'users_delete',
      },
      {
        permission_name: 'Xem chi tiết người dùng',
        permission_partten: '/users',
        permission_description: 'Cho phép xem thông tin chi tiết của một người dùng cụ thể, bao gồm tất cả các trường dữ liệu liên quan.',
        permission_code: 'users_view',
      },
    ];

    const permissionPermissions = [
      {
        permission_name: 'Xem danh sách quyền',
        permission_partten: '/permissions',
        permission_description: 'Cho phép xem danh sách tất cả các quyền được định nghĩa trong hệ thống, bao gồm tên và mô tả của từng quyền.',
        permission_code: 'permissions_list',
      },
      {
        permission_name: 'Tạo quyền mới',
        permission_partten: '/permissions',
        permission_description: 'Cho phép tạo một quyền mới với tên và mô tả cụ thể.',
        permission_code: 'permissions_create',
      },
      {
        permission_name: 'Chỉnh sửa thông tin quyền',
        permission_partten: '/permissions',
        permission_description: 'Cho phép chỉnh sửa tên và mô tả của một quyền hiện có.',
        permission_code: 'permissions_edit',
      },
      {
        permission_name: 'Xóa quyền',
        permission_partten: '/permissions',
        permission_description: 'Cho phép xóa một quyền khỏi hệ thống. Lưu ý rằng việc xóa quyền có thể ảnh hưởng đến các vai trò đã được gán quyền này.',
        permission_code: 'permissions_delete',
      },
      {
        permission_name: 'Xem chi tiết quyền',
        permission_partten: '/permissions',
        permission_description: 'Cho phép xem thông tin chi tiết của một quyền, bao gồm tên, mô tả và các vai trò sử dụng quyền đó.',
        permission_code: 'permissions_view',
      },
    ];

    const rolePermissions = [
      {
        permission_name: 'Xem danh sách vai trò',
        permission_partten: '/roles',
        permission_description: 'Cho phép xem danh sách tất cả các vai trò trong hệ thống, bao gồm tên và mô tả của từng vai trò.',
        permission_code: 'roles_list',
      },
      {
        permission_name: 'Tạo vai trò mới',
        permission_partten: '/roles',
        permission_description: 'Cho phép tạo một vai trò mới với tên, mô tả và tập hợp các quyền được gán.',
        permission_code: 'roles_create',
      },
      {
        permission_name: 'Chỉnh sửa thông tin vai trò',
        permission_partten: '/roles',
        permission_description: 'Cho phép chỉnh sửa tên, mô tả và tập hợp các quyền được gán của một vai trò hiện có.',
        permission_code: 'roles_edit',
      },
      {
        permission_name: 'Xóa vai trò',
        permission_partten: '/roles',
        permission_description: 'Cho phép xóa một vai trò khỏi hệ thống. Lưu ý rằng việc xóa vai trò có thể ảnh hưởng đến các người dùng đã được gán vai trò này.',
        permission_code: 'roles_delete',
      },
      {
        permission_name: 'Xem chi tiết vai trò',
        permission_partten: '/roles',
        permission_description: 'Cho phép xem thông tin chi tiết của một vai trò, bao gồm tên, mô tả và danh sách các quyền được gán.',
        permission_code: 'roles_view',
      },
    ];

    const orderPermissions = [
      {
        permission_name: 'Xem danh sách đơn hàng',
        permission_partten: '/orders',
        permission_description: 'Cho phép xem danh sách tất cả các đơn hàng trong hệ thống, bao gồm thông tin về khách hàng, sản phẩm, tổng tiền, trạng thái, ...',
        permission_code: 'orders_list',
      },
      {
        permission_name: 'Tạo đơn hàng mới',
        permission_partten: '/orders',
        permission_description: 'Cho phép tạo một đơn hàng mới với thông tin về khách hàng, sản phẩm, số lượng, giá cả, ...',
        permission_code: 'orders_create',
      },
      {
        permission_name: 'Chỉnh sửa thông tin đơn hàng',
        permission_partten: '/orders',
        permission_description: 'Cho phép chỉnh sửa thông tin của một đơn hàng hiện có, chẳng hạn như thay đổi sản phẩm, số lượng, giá cả, hoặc trạng thái.',
        permission_code: 'orders_edit',
      },
      {
        permission_name: 'Xóa đơn hàng',
        permission_partten: '/orders',
        permission_description: 'Cho phép xóa một đơn hàng khỏi hệ thống. Lưu ý rằng việc xóa đơn hàng có thể ảnh hưởng đến các báo cáo và thống kê.',
        permission_code: 'orders_delete',
      },
      {
        permission_name: 'Xem chi tiết đơn hàng',
        permission_partten: '/orders',
        permission_description: 'Cho phép xem thông tin chi tiết của một đơn hàng cụ thể, bao gồm tất cả các trường dữ liệu liên quan.',
        permission_code: 'orders_view',
      },
    ];

    const customerPermissions = [
      {
        permission_name: 'Xem danh sách khách hàng',
        permission_partten: '/customers',
        permission_description: 'Cho phép xem danh sách tất cả khách hàng trong hệ thống, bao gồm thông tin cơ bản như tên, email, số điện thoại và địa chỉ.',
        permission_code: 'customers_list',
      },
      {
        permission_name: 'Tạo khách hàng mới',
        permission_partten: '/customers',
        permission_description: 'Cho phép tạo một khách hàng mới trong hệ thống với các thông tin cần thiết như tên, email, số điện thoại và địa chỉ.',
        permission_code: 'customers_create',
      },
      {
        permission_name: 'Chỉnh sửa thông tin khách hàng',
        permission_partten: '/customers',
        permission_description: 'Cho phép chỉnh sửa thông tin của một khách hàng hiện có, bao gồm tên, email, số điện thoại và địa chỉ.',
        permission_code: 'customers_edit',
      },
      {
        permission_name: 'Xóa khách hàng',
        permission_partten: '/customers',
        permission_description: 'Cho phép xóa một khách hàng khỏi hệ thống. Lưu ý rằng việc xóa khách hàng có thể ảnh hưởng đến dữ liệu liên quan như đơn hàng.',
        permission_code: 'customers_delete',
      },
      {
        permission_name: 'Xem chi tiết khách hàng',
        permission_partten: '/customers',
        permission_description: 'Cho phép xem thông tin chi tiết của một khách hàng cụ thể, bao gồm tất cả các trường dữ liệu liên quan.',
        permission_code: 'customers_view',
      },
    ];

    const departmentPermissions = [
      {
        permission_name: 'Xem danh sách phòng ban',
        permission_partten: '/departments',
        permission_description: 'Cho phép xem danh sách tất cả phòng ban trong công ty, bao gồm tên phòng ban và mô tả.',
        permission_code: 'departments_list',
      },
      {
        permission_name: 'Tạo phòng ban mới',
        permission_partten: '/departments',
        permission_description: 'Cho phép tạo một phòng ban mới với tên và mô tả cụ thể.',
        permission_code: 'departments_create',
      },
      {
        permission_name: 'Chỉnh sửa thông tin phòng ban',
        permission_partten: '/departments',
        permission_description: 'Cho phép chỉnh sửa tên và mô tả của một phòng ban hiện có.',
        permission_code: 'departments_edit',
      },
      {
        permission_name: 'Xóa phòng ban',
        permission_partten: '/departments',
        permission_description: 'Cho phép xóa một phòng ban khỏi hệ thống. Lưu ý rằng việc xóa phòng ban có thể ảnh hưởng đến các nhân viên thuộc phòng ban đó.',
        permission_code: 'departments_delete',
      },
      {
        permission_name: 'Xem chi tiết phòng ban',
        permission_partten: '/departments',
        permission_description: 'Cho phép xem thông tin chi tiết của một phòng ban, bao gồm tên, mô tả và danh sách nhân viên thuộc phòng ban.',
        permission_code: 'departments_view',
      },
    ];

    const positionPermissions = [
      {
        permission_name: 'Xem danh sách chức vụ',
        permission_partten: '/positions',
        permission_description: 'Cho phép xem danh sách tất cả các chức vụ trong công ty, bao gồm tên chức vụ và mô tả.',
        permission_code: 'positions_list',
      },
      {
        permission_name: 'Tạo chức vụ mới',
        permission_partten: '/positions',
        permission_description: 'Cho phép tạo một chức vụ mới với tên và mô tả cụ thể.',
        permission_code: 'positions_create',
      },
      {
        permission_name: 'Chỉnh sửa thông tin chức vụ',
        permission_partten: '/positions',
        permission_description: 'Cho phép chỉnh sửa tên và mô tả của một chức vụ hiện có.',
        permission_code: 'positions_edit',
      },
      {
        permission_name: 'Xóa chức vụ',
        permission_partten: '/positions',
        permission_description: 'Cho phép xóa một chức vụ khỏi hệ thống. Lưu ý rằng việc xóa chức vụ có thể ảnh hưởng đến các nhân viên đang giữ chức vụ đó.',
        permission_code: 'positions_delete',
      },
      {
        permission_name: 'Xem chi tiết chức vụ',
        permission_partten: '/positions',
        permission_description: 'Cho phép xem thông tin chi tiết của một chức vụ, bao gồm tên, mô tả và danh sách nhân viên đang giữ chức vụ đó.',
        permission_code: 'positions_view',
      },
    ];

    const productPermissions = [
      {
        permission_name: 'Xem danh sách sản phẩm',
        permission_partten: '/products',
        permission_description: 'Cho phép xem danh sách tất cả sản phẩm trong hệ thống, bao gồm thông tin về tên, giá, mô tả, và số lượng.',
        permission_code: 'products_list',
      },
      {
        permission_name: 'Tạo sản phẩm mới',
        permission_partten: '/products',
        permission_description: 'Cho phép tạo một sản phẩm mới với thông tin về tên, giá, mô tả, số lượng, và các thuộc tính khác.',
        permission_code: 'products_create',
      },
      {
        permission_name: 'Chỉnh sửa thông tin sản phẩm',
        permission_partten: '/products',
        permission_description: 'Cho phép chỉnh sửa thông tin của một sản phẩm hiện có, chẳng hạn như thay đổi tên, giá, mô tả, hoặc số lượng.',
        permission_code: 'products_edit',
      },
      {
        permission_name: 'Xóa sản phẩm',
        permission_partten: '/products',
        permission_description: 'Cho phép xóa một sản phẩm khỏi hệ thống. Lưu ý rằng việc xóa sản phẩm có thể ảnh hưởng đến các đơn hàng liên quan.',
        permission_code: 'products_delete',
      },
      {
        permission_name: 'Xem chi tiết sản phẩm',
        permission_partten: '/products',
        permission_description: 'Cho phép xem thông tin chi tiết của một sản phẩm cụ thể, bao gồm tất cả các trường dữ liệu liên quan.',
        permission_code: 'products_view',
      },
    ];

    const profilePermissions = [
      {
        permission_name: 'Xem trang hồ sơ',
        permission_partten: '/profiles',
        permission_description: 'Cho phép truy cập và xem trang hồ sơ cá nhân.',
        permission_code: 'profile_view',
      },
      {
        permission_name: 'Chỉnh sửa hồ sơ',
        permission_partten: '/profiles',
        permission_description: 'Cho phép chỉnh sửa thông tin trên trang hồ sơ cá nhân.',
        permission_code: 'profile_edit',
      },
    ];

    const logPermissions = [
      {
        permission_name: 'Xem nhật ký hoạt động',
        permission_partten: '/logs',
        permission_description: 'Cho phép xem nhật ký ghi lại các hoạt động của người dùng trong hệ thống.',
        permission_code: 'logs_view',
      },
    ];

    const salesPermissions = [
      {
        permission_name: 'Xem báo cáo bán hàng',
        permission_partten: '/sales',
        permission_description: 'Cho phép xem các báo cáo về doanh số bán hàng, thống kê sản phẩm bán chạy, ...',
        permission_code: 'sales_reports_view',
      },
      {
        permission_name: 'Quản lý đơn hàng',
        permission_partten: '/sales',
        permission_description: 'Cho phép tạo, chỉnh sửa, và xóa đơn hàng.',
        permission_code: 'sales_orders_manage',
      },
    ];

    const reportPermissions = [
      {
        permission_name: 'Xem báo cáo tổng quan',
        permission_partten: '/reports',
        permission_description: 'Cho phép xem các báo cáo tổng quan về hoạt động kinh doanh, bao gồm doanh thu, lợi nhuận, ...',
        permission_code: 'reports_overview_view',
      },
      {
        permission_name: 'Xem báo cáo chi tiết',
        permission_partten: '/reports',
        permission_description: 'Cho phép xem các báo cáo chi tiết về từng khía cạnh của hoạt động kinh doanh, như báo cáo bán hàng, báo cáo tồn kho, ...',
        permission_code: 'reports_detail_view',
      },
    ];

    await queryInterface.bulkInsert('permissions', [
      ...userPermissions,
      ...permissionPermissions,
      ...rolePermissions,
      ...orderPermissions,
      ...customerPermissions,
      ...departmentPermissions,
      ...positionPermissions,
      ...productPermissions,
      ...profilePermissions,
      ...logPermissions,
      ...salesPermissions,
      ...reportPermissions,
    ], {});

  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('permissions', null, {});
  }
};
