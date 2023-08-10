import * as z from 'zod';


export const DoctorAdmin = z.object({
    name: z.string(),
    specialist: z.string(),
    image: z.string(),
    designation: z.string(),
    link: z.string()
}).strict();


export const Doctor = z.object({
    name: z.string(),
    specialist: z.string(),
    image: z.string(),
    designation: z.string(),
    division: z.string(),
    link: z.string()
}).strict();