import * as z from 'zod';

export const LabCreate = z.object({
    name: z.string(),
    labId: z.string()
}).strict();

