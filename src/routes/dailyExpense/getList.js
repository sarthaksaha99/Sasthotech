import express  from 'express';
import checkAuth  from '../authorization/checkAuth.js';
import prisma from '../../db/prisma.js';
import { pagination } from '../../utils/pagination.js';

// Validation
import { requestValidator } from '../../middleware/requestValidator.js';
import { FilterWithDate } from '../../validators/FilterWithDate.js'

const router = express.Router();

router.get('/', checkAuth(), requestValidator({query: FilterWithDate}), async (req, res, next) => {
    try {
        const {diagnosticId} = req.user;

        // Query
        let query = {
            diagnosticId, 
            createdAt: {gte: req.query.from, lte: req.query.to},
        }

        // Total count
        const totalCount = await prisma.dailyExpense.count({where: query});

        // Pagination
        const {skip, limit} = pagination(req.query, totalCount);

        // Fetech from db
        const expenses = await prisma.dailyExpense.findMany({
            where: query,
            skip,
            take: limit
        });

        res.json({
            message: 'daily expense list',
            data: {
                totalPage: Math.ceil(totalCount / limit),
                totalItems: totalCount,
                items: expenses
            }
        });
    }
    catch(error) {
        next(error);
    }
});



export default router;