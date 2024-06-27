import { IBaseFilterParams, IBaseResponse } from '@/packages/commons/base.interface'

export interface IGetLisCustomersRespone extends IBaseResponse<ICustomer[]> { }

export interface IFilterParams extends IBaseFilterParams {
    customer_id?: number;
    customer_name?: string;
    customer_name_fix?: number;
    customer_email?: string;
    customer_email_fix?: number;
    customer_birthday?: number;
    customer_phone?: string;
    customer_phone_fix?: number;
    customer_status?: number | number[];
    customer_provice_id?: number;
    customer_district_id?: number;
    customer_ward_id?: number;
    customer_code?: string;
    customer_config?: number;
    customer_create_by?: number;
    customer_description?: string;
    customer_properties?: string;
    create_from_date?: number; // Giả sử là timestamp
    create_to_date?: number; // Giả sử là timestamp
    join_from_date?: number; // Giả sử là timestamp
    join_to_date?: number; // Giả sử là timestamp
    delete_from_date?: number; // Giả sử là timestamp
    delete_to_date?: number; // Giả sử là timestamp
    need_password?: number;
    customer_name_or?: number; // 1: OR, 0: AND
    customer_email_or?: number; // 1: OR, 0: AND
    customer_phone_or?: number; // 1: OR, 0: AND
}

export default interface ICustomer {
    customer_id: number;
    customer_name: string;
    customer_email?: string;
    customer_avatar: string;
    customer_phone: string;
    customer_code: string;
    customer_status: number;
    customer_birthday?: number;
    customer_description?: string;
    customer_properties?: string; // JSON string
    customer_config: number;
    customer_password: string;
    customer_full_address?: string;
    customer_detail_address?: string;
    customer_provide_id?: number;
    customer_district_id?: number;
    customer_ward_id?: number;
    customer_create_by?: number;
    customer_join_date?: number;
    customer_deleted_at?: number;
    customer_created_at?: number;
    customer_updated_at?: number;
}