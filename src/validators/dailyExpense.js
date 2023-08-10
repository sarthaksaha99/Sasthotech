import * as z from 'zod';


export const DailyExpense = z.object({
    type: z.string(),
    handedTo: z.string(),
    amount: z.number()
}).strict();
