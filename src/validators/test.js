import * as z from 'zod';


export const Test = z.object({
    name: z.string()
}).strict();

export const TestAdmin = z.object({
    name: z.string(),
    price: z.number(),
    type: z.string()
}).strict();