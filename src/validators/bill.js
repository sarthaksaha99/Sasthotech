import * as z from 'zod';


export const BillCreate = z.object({
    name: z.string(),
    age: z.number().nonnegative(),
    gender: z.string(),
    paidAmount: z.number().nonnegative().default(0),
    hospitalDiscount: z.number().nonnegative(),
    doctorPercentage: z.number().nonnegative(),
    pcName: z.string().optional(),
    pcPercentage: z.number().nonnegative().default(0),
    phone: z.string(),
    doctorId: z.string().optional(),
    doctorNameFix: z.string().optional(),
    tests: z.array(z.object({
        testId: z.number().nonnegative(),
        quantity: z.number().nonnegative()
    }).strict())
}).strict();

export const BillUpdate = z.object({
    paidAmount: z.number().nonnegative().optional(),
    status: z.string().optional()
}).strict();