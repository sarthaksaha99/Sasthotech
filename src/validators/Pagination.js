import * as z from 'zod';

const preProcess = (d) => parseInt(z.string().parse(d));

export const Pagination = z.object({
    page: z.preprocess(preProcess, z.number().nonnegative()).optional(),
    limit: z.preprocess(preProcess, z.number().nonnegative()).optional()
}).strict();