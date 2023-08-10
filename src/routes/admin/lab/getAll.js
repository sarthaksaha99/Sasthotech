import express  from 'express';
import checkAuth  from '../../authorization/checkAuth.js';
import prisma from '../../../db/prisma.js';
import { pagination } from '../../../utils/pagination.js';

// Validation
import { requestValidator } from '../../../middleware/requestValidator.js';
import { Pagination } from '../../../validators/Pagination.js'

const router = express.Router();

router.get('/', checkAuth(["admin"]), requestValidator({query: Pagination}), async (req, res, next) => {
    try {
        // Total count
        const totalCount = await prisma.lab.count();

        // Pagination
        const {skip, limit} = pagination(req.query, totalCount);

        // Fetech from db
        const labs = await prisma.lab.findMany({
            skip,
            take: limit,
            select: {
                id: true,
                labId: true,
                name: true
            }
        });

        res.json({
            message: 'lab list',
            data: {
                totalPage: Math.ceil(totalCount / limit),
                totalItems: totalCount,
                items: labs
            }
        });
    }
    catch(error) {
        next(error);
    }
});



export default router;