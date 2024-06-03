import { IBaseResponse, IBaseFilterParams } from '@/packages/commons/base-interfaces'
import ICustomer from '@/interfaces/ICustomer'

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
}