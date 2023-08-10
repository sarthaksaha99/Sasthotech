import express  from 'express';
import checkAuth  from '../authorization/checkAuth.js';
import prisma from '../../db/prisma.js';


// Validator
import { requestValidator } from "../../middleware/requestValidator.js";
import { IdParamsInt } from '../../validators/IdParams.js'
import createHttpError from 'http-errors';

const router = express.Router();

router.delete('/:id', checkAuth(["admin", "receptionist"]), requestValidator({params: IdParamsInt}), async (req, res, next) => {
    try {
        const {id} = req.params;
        const {diagnosticId} = req.user;

        // Delete Bill & billTests
        const bill = await prisma.$transaction([
            prisma.billTest.deleteMany({where: {diagnosticId, billId: id, billId: id}}),
            prisma.bill.deleteMany({where: {diagnosticId, id}})
        ]);

        if(bill[1]?.count == 0) throw createHttpError(404, 'Not Found');

        res.json({
            message: 'Bill & Billtest are deleted.'
        });
    }
    catch(error) {
        next(error);
    }
});



export default router;