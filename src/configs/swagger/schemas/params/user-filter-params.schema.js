const IUserFilterParams = {
    type: "object",
    properties: {
        user_name: {
            type: "string",
            description: "Tên người dùng (có thể tìm kiếm gần đúng nếu user_name_fix = false)"
        },
        user_name_fix: {
            type: "boolean",
            description: "Cho biết có tìm kiếm chính xác tên người dùng hay không (true: chính xác, false: gần đúng)"
        },
        user_email: {
            type: "string",
            description: "Email người dùng (có thể tìm kiếm gần đúng nếu user_email_fix = false)"
        },
        user_email_fix: {
            type: "boolean",
            description: "Cho biết có tìm kiếm chính xác email người dùng hay không (true: chính xác, false: gần đúng)"
        },
        user_phone: {
            type: "string",
            description: "Số điện thoại người dùng (có thể tìm kiếm gần đúng nếu user_phone_fix = false)"
        },
        user_phone_fix: {
            type: "boolean",
            description: "Cho biết có tìm kiếm chính xác số điện thoại người dùng hay không (true: chính xác, false: gần đúng)"
        },
        user_status: {
            type: "array",
            items: {
                type: "integer"
            },
            description: "Trạng thái của người dùng (danh sách các trạng thái)"
        },
        user_role_id: {
            type: "array",
            items: {
                type: "integer"
            },
            description: "ID vai trò của người dùng (danh sách các ID vai trò)"
        },
        user_department_id: {
            type: "array",
            items: {
                type: "integer"
            },
            description: "ID phòng ban của người dùng (danh sách các ID phòng ban)"
        },
        user_position_id: {
            type: "array",
            items: {
                type: "integer"
            },
            description: "ID vị trí của người dùng (danh sách các ID vị trí)"
        },
        user_provice_id: {
            type: "integer",
            description: "ID tỉnh/thành phố của người dùng"
        },
        user_district_id: {
            type: "integer",
            description: "ID quận/huyện của người dùng"
        },
        user_ward_id: {
            type: "integer",
            description: "ID phường/xã của người dùng"
        },
        user_code: {
            type: "string",
            description: "Mã người dùng"
        },
        user_config: {
            type: "integer",
            description: "Cấu hình người dùng"
        },
        user_create_by: {
            type: "integer",
            description: "ID người tạo người dùng"
        },
        create_from_date: {
            type: "integer",
            description: "Thời gian tạo từ (timestamp)"
        },
        create_to_date: {
            type: "integer",
            description: "Thời gian tạo đến (timestamp)"
        },
        join_from_date: {
            type: "integer",
            description: "Thời gian tham gia từ (timestamp)"
        },
        join_to_date: {
            type: "integer",
            description: "Thời gian tham gia đến (timestamp)"
        },
        delete_from_date: {
            type: "integer",
            description: "Thời gian xóa từ (timestamp)"
        },
        delete_to_date: {
            type: "integer",
            description: "Thời gian xóa đến (timestamp)"
        },
        need_password: {
            type: "boolean",
            description: "Cho biết có cần mật khẩu hay không"
        }
    }
};

module.exports = IUserFilterParams;