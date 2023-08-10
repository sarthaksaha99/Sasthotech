import express  from 'express';
import checkAuth  from '../authorization/checkAuth.js';
import prisma from '../../db/prisma.js';


// Validator
import { requestValidator } from "../../middleware/requestValidator.js";
import { IdParams } from '../../validators/IdParams.js'
import { AppointmentUpdate } from "../../validators/appointment.js";
import createHttpError from 'http-errors';

const router = express.Router();

router.patch('/:id', checkAuth(["admin", "receptionist"]), requestValidator({params: IdParams, body: AppointmentUpdate}), async (req, res, next) => {
    try {
        const {diagnosticId} = req.user;
        const {id} = req.params;

        // Create Diagnostic & admin user
        const appointment = await prisma.appointment.updateMany({
            where: {id, diagnosticId},
            data: req.body
        });

        if(!appointment.count) throw createHttpError(404, "Appointment not found");

        res.json({
            message: 'Appointment is updated.'
        });
    }
    catch(error) {
        next(error);
    }
});



export default router;