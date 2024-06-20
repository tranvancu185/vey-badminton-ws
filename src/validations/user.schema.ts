import { z } from 'zod';

export const filterSchema = z.object({
    user_id: z.number().optional(),
    user_name: z.string().optional(),
    user_email: z.string().optional(),
    user_phone: z.string().optional(),
    user_status: z.array(z.number()).optional(),
    user_role: z.array(z.number()).optional(),
    create_from_date: z.number().optional(),
    create_to_date: z.number().optional(),
    delete_from_date: z.number().optional(),
    delete_to_date: z.number().optional(),
    join_from_date: z.number().optional(),
    join_to_date: z.number().optional(),
    user_phone_fix: z.number().optional(),
    user_role_id: z.number().optional(),
    user_department_id: z.number().optional(),
    user_position_id: z.number().optional(),
    user_provice_id: z.number().optional(),
    user_district_id: z.number().optional(),
    user_ward_id: z.number().optional(),
    user_code: z.string().optional(),
});

export const registerUserSchema = z.object({
    user_email: z.string().email('INVALID_EMAIL'),
    user_password: z.string().min(6, 'INVALID_PASSWORD_MIN'),
    user_name: z.string().min(2, 'INVALID_NAME_MIN'),
    user_phone: z.string().min(10, 'INVALID_PHONE'),
    user_full_address: z.string().min(10, 'INVALID_FULL_ADDRESS_MIN'),
    user_detail_address: z.string().min(2, 'INVALID_DETAIL_ADDRESS_MIN'),
    user_provice_id: z.number(),
    user_district_id: z.number(),
    user_ward_id: z.number(),
});