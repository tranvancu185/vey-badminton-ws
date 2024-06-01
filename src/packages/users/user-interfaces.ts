import { IBaseResponse, IBaseFilterParams } from '@/packages/commons/base-interfaces'
import User from '@/interfaces/IUser'

export interface IGetListUsersRespone extends IBaseResponse<User[]> { }

export interface IUserFilterParams extends IBaseFilterParams {
    user_name?: string;
    user_name_fix?: boolean;
    user_email?: string;
    user_email_fix?: boolean;
    user_phone?: string;
    user_phone_fix?: boolean;
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
    need_password?: boolean;
}