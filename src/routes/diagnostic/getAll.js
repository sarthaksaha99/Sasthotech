import express  from 'express';
import checkAuth  from '../authorization/checkAuth.js';
import prisma from '../../db/prisma.js';
import { pagination } from '../../utils/pagination.js';

// Validation
import { requestValidator } from '../../middleware/requestValidator.js';
import { Pagination } from '../../validators/Pagination.js'

const router = express.Router();

router.get('/', checkAuth(["superadmin"]), requestValidator({query: Pagination}), async (req, res, next) => {
    try {
        // Total count
        const totalCount = await prisma.diagnostic.count();

        // Pagination
        const {skip, limit} = pagination(req.query, totalCount);

        // Fetech from db
        const diagnostics = await prisma.diagnostic.findMany({
            skip,
            take: limit,
            include: {
                users: {
                    where: {role: 'admin'},
                    select: {
                        name: true,
                        email: true
                    },

                }
            }
        });

        diagnostics.forEach(diagnostic => {
            diagnostic.admin = diagnostic.users[0];
            delete diagnostic.users;
        })

        res.json({
            message: 'Diagnostic list',
            data: {
                totalPage: Math.ceil(totalCount / limit),
                totalItems: totalCount,
                items: diagnostics
            }
        });
    }
    catch(error) {
        next(error);
    }
});



export default router;