import { IBaseFilterParams, IBaseResponse } from '@/packages/commons/base.interface'

export interface IGetListUsersRespone extends IBaseResponse<IUser[]> { }

export interface IUserFilterParams extends IBaseFilterParams {
    user_id?: number;
    user_name?: string;
    user_name_fix?: number;
    user_email?: string;
    user_email_fix?: number;
    user_phone?: string;
    user_phone_fix?: number;
    user_status?: number | number[];
    user_role_id?: number | number[];
    user_department_id?: number | number[];
    user_position_id?: number | number[];
    user_provice_id?: number;
    user_district_id?: number;
    user_ward_id?: number;
    user_code?: string;
    user_config?: number;
    user_create_by?: number;
    create_from_date?: number; // Giả sử là timestamp
    create_to_date?: number; // Giả sử là timestamp
    join_from_date?: number; // Giả sử là timestamp
    join_to_date?: number; // Giả sử là timestamp
    delete_from_date?: number; // Giả sử là timestamp
    delete_to_date?: number; // Giả sử là timestamp
    need_password?: number;
}

export default interface IUser {
    user_id?: number;
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