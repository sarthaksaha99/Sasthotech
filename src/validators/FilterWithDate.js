import * as z from 'zod';
import { Pagination } from "./Pagination.js";

export const FromTo = z.object({
    from: z.coerce.date().optional(),
    to: z.coerce.date().optional()
}).strict();

export const FilterWithDate = Pagination.merge(FromTo);