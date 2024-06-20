import { z } from 'zod';

export const loginSchema = z.object({
    user_email: z.string().email('Invalid email or password!'),
    user_password: z.string().min(4, 'Invalid email or password!'),
});

export const registerUserSchema = z.object({
    user_email: z.string().email('Invalid email!'),
    user_password: z.string().min(4, 'Password must be at least 4 characters!'),
    user_name: z.string().min(2, 'Name must be at least 2 characters!'),
    user_phone: z.string().min(10, 'Invalid phone number!'),
    user_address: z.string().min(2, 'Address must be at least 2 characters!'),
});

export const registerCustomerSchema = z.object({
    customer_name: z.string().min(2, 'Name must be at least 2 characters!'),
    customer_phone: z.string().min(10, 'Invalid phone number!'),
    customer_email: z.string().email('Invalid email!'),
    customer_password: z.string().min(6, 'Password must be at least 4 characters!')
});