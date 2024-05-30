export default interface User {
    user_id: number;
    user_name: string;
    user_email: string;
    user_avatar: string;
    user_phone: string;
    user_address: string;
    user_code: string;
    user_status: number; // 0: inactive, 1: active, 2: deleted
    user_birthday: string;
    user_description: string; // text description of user
    user_properties: string; // That is JSON string
    user_config: number; // That is bitwise value

    user_role: number;
    user_department: number;
    user_position: number;
    user_create_by: number; // user_id of user who create this user

    user_join_date: string;
    user_deleted_at: string;
    user_created_at: string;
    user_updated_at: string;
}