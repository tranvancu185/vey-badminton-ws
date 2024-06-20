import { z } from 'zod';

export const loginSchema = z.object({
    user_email: z.string()
        .email('INVALID_LOGIN')
        .refine(
            (val) => val !== undefined && val !== null && val !== "", // Kiểm tra xem đã điền hay chưa
            { message: 'INVALID_LOGIN' }
        ),
    user_password: z.string()
        .min(4, 'INVALID_LOGIN')
        .refine(
            (val) => val !== undefined && val !== null && val !== "", // Kiểm tra xem đã điền hay chưa
            { message: 'INVALID_LOGIN' }
        ),
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

export const registerCustomerSchema = z.object({
    customer_name: z.string().min(2, 'INVALID_NAME_MIN'),
    customer_phone: z.string().min(10, 'INVALID_PHONE'),
    customer_email: z.string().email('INVALID_EMAIL'),
    customer_password: z.string().min(6, 'INVALID_PASSWORD_MIN')
});