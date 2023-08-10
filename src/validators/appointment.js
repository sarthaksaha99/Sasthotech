import * as z from 'zod';


export const AppointmentCreate = z.object({
    name: z.string(),
    phone: z.string(),
    time: z.string(),
    serial: z.number().positive(),
    doctorId: z.string().cuid().optional(),
}).strict();

export const AppointmentUpdate = z.object({
    name: z.string().optional(),
    phone: z.string().optional(),
    time: z.string().optional(),
    serial: z.number().optional(),
    status: z.string().optional(),
    doctorId: z.string().cuid().optional(),
}).strict();