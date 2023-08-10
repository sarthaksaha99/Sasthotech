import express  from 'express';
import checkAuth  from '../authorization/checkAuth.js';
import prisma from '../../db/prisma.js';


// Validator
import { requestValidator } from "../../middleware/requestValidator.js";
import { IdParams } from '../../validators/IdParams.js'
import createHttpError from 'http-errors';

const router = express.Router();

router.delete('/:id', checkAuth(["admin", "receptionist"]), requestValidator({params: IdParams}), async (req, res, next) => {
    try {
        const {diagnosticId} = req.user;
        const {id} = req.params;

        // Delete Diagnostic & admin user
        const appointment = await prisma.appointment.deleteMany({where: {id, diagnosticId}});

        if(appointment.count === 0) throw createHttpError(404, 'Not found');

        res.json({
            message: 'Daily appointment is deleted.'
        });
    }
    catch(error) {
        next(error);
    }
});



export default router;