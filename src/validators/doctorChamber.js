import * as z from 'zod';


export const DoctorChamberCreate = z.object({
    place: z.string(),
    time: z.string(),
    doctorId: z.string().cuid(),
    phone: z.string().optional()
}).strict();