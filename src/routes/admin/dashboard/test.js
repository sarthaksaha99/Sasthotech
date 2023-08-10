import express  from 'express';
import checkAuth  from '../../authorization/checkAuth.js';
import prisma from '../../../db/prisma.js';
import { pagination } from '../../../utils/pagination.js';

// Validation
import { requestValidator } from '../../../middleware/requestValidator.js';
import { FilterWithDate } from '../../../validators/FilterWithDate.js'

const router = express.Router();

router.get('/', checkAuth(["admin"]), requestValidator({query: FilterWithDate}), async (req, res, next) => {
    try {
        const {diagnosticId} = req.user;

        // Query
        let query = {
            diagnosticId, 
            createdAt: {gte: req.query.from, lte: req.query.to},
        }

        // Total count
        const totalCount = await prisma.billTest.count({where: query});

        // Pagination
        const {skip, limit} = pagination(req.query, totalCount);

        // Fetech from db
        const billTests = await prisma.billTest.findMany({
            where: query,
            skip,
            take: limit,
            select: {
                name: true,
                quantity: true,
                type: true,
                bill: {select: {
                    name: true
                }}
            }
        });

        const formatedData = billTests.map(({name, type, quantity, bill}) => {
            return {
                testName: name,
                testType: type,
                testQuantity: quantity,
                pasentName: bill.name
            }
        })

        res.json({
            message: 'Test list',
            data: {
                totalPage: Math.ceil(totalCount / limit),
                totalItems: totalCount,
                items: formatedData
            }
        });
    }
    catch(error) {
        next(error);
    }
});



export default router;