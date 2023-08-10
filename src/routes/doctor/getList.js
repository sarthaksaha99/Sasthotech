import express  from 'express';
import checkAuth  from '../authorization/checkAuth.js';
import prisma from '../../db/prisma.js';
import { pagination } from '../../utils/pagination.js';

// Validation
import { requestValidator } from '../../middleware/requestValidator.js';
import { Pagination } from '../../validators/Pagination.js'

const router = express.Router();

router.get('/', checkAuth(), requestValidator({query: Pagination}), async (req, res, next) => {
    try {
        const {diagnosticId, division} = req.user;

        // Handling query
        let queryData = {OR: [{diagnosticId}, {diagnosticId: null}]};
        if(division) { 
            queryData = {OR: [{diagnosticId}, {diagnosticId: null, division}]};
        }

        // Total count
        const totalCount = await prisma.doctor.count({
            where: queryData
        });

        // Pagination
        const {skip, limit} = pagination(req.query, totalCount);

        // Fetech from db
        const doctors = await prisma.doctor.findMany({
            where: queryData,
            skip,
            take: limit,
            select: {
                id: true,
                name: true,
	            specialist: true,
	            image: true,
	            designation: true,
	            division: true,
	            link: true,
            },
            orderBy: [
                {
                    diagnosticId: {sort: "desc", nulls: 'last'}
                },
                {
                    createdAt: "desc"
                }
            ]
        });

        res.json({
            message: 'Doctors list',
            data: {
                totalPage: Math.ceil(totalCount / limit),
                totalItems: totalCount,
                items: doctors
            }
        });
    }
    catch(error) {
        next(error);
    }
});



export default router;