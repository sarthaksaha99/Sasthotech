import * as z from 'zod';


export const DiagnosticCreate = z.object({
    email: z.string().email(),
    password: z.string().min(6).max(127),
    division: z.string()
}).strict();

export const DiagnosticUpdate = z.object({
    name: z.string().optional(),
    address: z.string().optional(),
    logo: z.string().optional()
}).strict();