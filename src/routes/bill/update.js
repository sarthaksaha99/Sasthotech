import express  from 'express';
import checkAuth  from '../authorization/checkAuth.js';
import prisma from '../../db/prisma.js';


// Validator
import { requestValidator } from "../../middleware/requestValidator.js";
import { IdParamsInt } from '../../validators/IdParams.js'
import { BillUpdate } from "../../validators/bill.js";
import createHttpError from 'http-errors';

const router = express.Router();

router.patch('/:id', checkAuth(["admin", "receptionist"]), requestValidator({params: IdParamsInt, body: BillUpdate}), async (req, res, next) => {
    try {
        const {diagnosticId} = req.user;
        const {id} = req.params;

        // Create Diagnostic & admin user
        const bill = await prisma.bill.updateMany({
            where: {id, diagnosticId},
            data: req.body
        });

        if(!bill.count) throw createHttpError(404, "Bill not found");

        res.json({
            message: 'bill paid amount updated',
            data: bill
        });
    }
    catch(error) {
        next(error);
    }
});



export default router;