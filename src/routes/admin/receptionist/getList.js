import express  from 'express';
import checkAuth  from '../../authorization/checkAuth.js';
import prisma from '../../../db/prisma.js';
import { pagination } from '../../../utils/pagination.js';

// Validation
import { requestValidator } from '../../../middleware/requestValidator.js';
import { Pagination } from '../../../validators/Pagination.js'

const router = express.Router();

router.get('/', checkAuth(['admin']), requestValidator({query: Pagination}), async (req, res, next) => {
    try {
        const {diagnosticId} = req.user;

        // Total count
        const totalCount = await prisma.user.count({
            where: {diagnosticId, role: 'receptionist'}
        });

        // Pagination
        const {skip, limit} = pagination(req.query, totalCount);

        // Fetech from db
        const users = await prisma.user.findMany({
            where: {diagnosticId, role: 'receptionist'},
            skip,
            take: limit,
            select: {
                id: true,
                name: true,
                email: true
            }
        });

        res.json({
            message: 'receptionists list',
            data: {
                totalPage: Math.ceil(totalCount / limit),
                totalItems: totalCount,
                items: users
            }
        });
    }
    catch(error) {
        next(error);
    }
});



export default router;