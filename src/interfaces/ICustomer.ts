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