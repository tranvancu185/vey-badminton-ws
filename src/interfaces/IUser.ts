export default interface IUser {
    user_id: number;
    user_name: string;
    user_email?: string;  // Cho phép null
    user_avatar: string;
    user_phone: string;
    user_full_address?: string;
    user_detail_address?: string;
    user_provice_id?: string;
    user_district_id?: string;
    user_ward_id?: string;
    user_code: string;
    user_status?: number; // Cho phép null
    user_birthday?: number; // Cho phép null
    user_description?: string; // Cho phép null
    user_properties?: string; // Cho phép null
    user_config: number;
    user_password: string;
    user_role_id?: number; // Cho phép null
    user_department_id?: number; // Cho phép null
    user_position_id?: number; // Cho phép null
    user_create_by?: number; // Cho phép null
    user_join_date?: number; // Cho phép null
    user_deleted_at?: number; // Cho phép null
    user_created_at?: number; // Cho phép null
    user_updated_at?: number; // Cho phép null
}