import express  from 'express';
import checkAuth  from '../../authorization/checkAuth.js';
import prisma from '../../../db/prisma.js';
import { pagination } from '../../../utils/pagination.js';

// Validation
import { requestValidator } from '../../../middleware/requestValidator.js';
import { Pagination } from '../../../validators/Pagination.js'

const router = express.Router();

router.get('/', checkAuth(), requestValidator({query: Pagination}), async (req, res, next) => {
    try {
        // Total count
        const totalCount = await prisma.test.count();

        // Pagination
        const {skip, limit} = pagination(req.query, totalCount);

        // Fetech from db
        const tests = await prisma.test.findMany({
            skip,
            take: limit
        });

        res.json({
            message: 'tests list',
            data: {
                totalPage: Math.ceil(totalCount / limit),
                totalItems: totalCount,
                items: tests
            }
        });
    }
    catch(error) {
        next(error);
    }
});



export default router;