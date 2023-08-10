import * as z from 'zod';


export const IdParams = z.object({
    id: z.string().cuid()
});




const preProcess = (d) => parseInt(z.string().parse(d));

export const IdParamsInt = z.object({
    id: z.preprocess(preProcess, z.number().nonnegative())
});