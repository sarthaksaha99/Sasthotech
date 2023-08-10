import express  from 'express';
import checkAuth  from '../authorization/checkAuth.js';
import prisma from '../../db/prisma.js';

// Validation
import { requestValidator } from '../../middleware/requestValidator.js';
import { IdParamsInt } from '../../validators/IdParams.js'
import createHttpError from 'http-errors';

const router = express.Router();

router.get('/:id', checkAuth(["admin", "receptionist"]), requestValidator({params: IdParamsInt}), async (req, res, next) => {
    try {
        const {id} = req.params;
        const {diagnosticId} = req.user;
        
        // Fetech from db
        const bill = await prisma.bill.findUnique({
            where: {id},
            include: {tests: true}
        });

        if(diagnosticId !== bill?.diagnosticId) throw createHttpError(404, "Not Found");

        res.json({
            message: 'Bill Details',
            data: bill
        });
    }
    catch(error) {
        next(error);
    }
});



export default router;