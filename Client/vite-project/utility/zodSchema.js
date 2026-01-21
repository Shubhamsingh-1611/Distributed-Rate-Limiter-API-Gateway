import { z} from 'zod';

export const registerSchema = z.object({
    username: z.string().min(3, 'Username must be at least 3 characters long').regex(/^(?=.*[0-9])(?=.*[!@#$%^&*]).+$/, "Username must contain at least one number and one special character"),
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters long'),
    confirmPassword: z.string().min(6, 'Confirm Password must be at least 6 characters long'),
}).refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
});

export const loginSchema = z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters long'),
});