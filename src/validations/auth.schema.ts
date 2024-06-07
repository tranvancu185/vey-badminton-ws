import { z } from 'zod';

export const loginSchema = z.object({
    user_email: z.string().email('Invalid email or password!'),
    user_password: z.string().min(6, 'Invalid email or password!'),
});