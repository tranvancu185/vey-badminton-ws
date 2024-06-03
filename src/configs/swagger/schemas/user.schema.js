
module.exports = {
    type: 'object',
    properties: {
        user_id: {
            type: 'integer',
            description: 'ID của người dùng'
        },
        user_name: {
            type: 'string',
            description: 'Tên người dùng'
        },
        user_email: {
            type: 'string',
            description: 'Email của người dùng',
            nullable: true
        },
        user_avatar: {
            type: 'string',
            description: 'Đường dẫn đến ảnh đại diện của người dùng'
        },
        user_phone: {
            type: 'string',
            description: 'Số điện thoại của người dùng'
        },
        user_full_address: {
            type: 'string',
            description: 'Địa chỉ đầy đủ của người dùng',
            nullable: true
        },
        user_detail_address: {
            type: 'string',
            description: 'Địa chỉ chi tiết của người dùng',
            nullable: true
        },
        user_provice_id: {
            type: 'string',
            description: 'ID tỉnh/thành phố của người dùng',
            nullable: true
        },
        user_district_id: {
            type: 'string',
            description: 'ID quận/huyện của người dùng',
            nullable: true
        },
        user_ward_id: {
            type: 'string',
            description: 'ID phường/xã của người dùng',
            nullable: true
        },
        user_code: {
            type: 'string',
            description: 'Mã người dùng'
        },
        user_status: {
            type: 'integer',
            description: 'Trạng thái của người dùng',
            nullable: true
        },
        user_birthday: {
            type: 'integer',
            format: 'int64', // Định dạng timestamp
            description: 'Ngày sinh của người dùng (timestamp)',
            nullable: true
        },
        user_description: {
            type: 'string',
            description: 'Mô tả về người dùng',
            nullable: true
        },
        user_properties: {
            type: 'string',
            description: 'Các thuộc tính khác của người dùng',
            nullable: true
        },
        user_config: {
            type: 'integer',
            description: 'Cấu hình của người dùng'
        },
        user_password: {
            type: 'string',
            description: 'Mật khẩu của người dùng (đã được băm)'
        },
        user_role_id: {
            type: 'integer',
            description: 'ID vai trò của người dùng',
            nullable: true
        },
        user_department_id: {
            type: 'integer',
            description: 'ID phòng ban của người dùng',
            nullable: true
        },
        user_position_id: {
            type: 'integer',
            description: 'ID vị trí của người dùng',
            nullable: true
        },
        user_create_by: {
            type: 'integer',
            description: 'ID người tạo người dùng',
            nullable: true
        },
        user_join_date: {
            type: 'integer',
            format: 'int64', // Định dạng timestamp
            description: 'Ngày tham gia của người dùng (timestamp)',
            nullable: true
        },
        user_deleted_at: {
            type: 'integer',
            format: 'int64', // Định dạng timestamp
            description: 'Thời điểm người dùng bị xóa (timestamp)',
            nullable: true
        },
        user_created_at: {
            type: 'integer',
            format: 'int64', // Định dạng timestamp
            description: 'Thời điểm người dùng được tạo (timestamp)',
            nullable: true
        },
        user_updated_at: {
            type: 'integer',
            format: 'int64', // Định dạng timestamp
            description: 'Thời điểm người dùng được cập nhật lần cuối (timestamp)',
            nullable: true
        }
    }
}