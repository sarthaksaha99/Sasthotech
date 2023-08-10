import * as z from 'zod';


export const UserSignIn = z.object({
    email: z.string().email(),
    password: z.string().min(6).max(127)
}).strict();


export const UserUpdate = z.object({
    name: z.string().optional(),
    password: z.string().min(6).max(127).optional(),
    oldPassword: z.string().optional()
}).strict();