import express  from 'express';
import checkAuth  from '../authorization/checkAuth.js';
import prisma from '../../db/prisma.js';


// Validator
import { requestValidator } from "../../middleware/requestValidator.js";
import { AppointmentCreate } from "../../validators/appointment.js";

const router = express.Router();

router.post('/', checkAuth(["admin", "receptionist"]), requestValidator({body: AppointmentCreate}), async (req, res, next) => {
    try {
        const {diagnosticId} = req.user;
        // Save to db
        const appointment = await prisma.appointment.create({
            data: {
                ...req.body,
                diagnosticId
            }
        });

        res.json({
            message: 'Appointment is added.',
            data: appointment
        });
    }
    catch(error) {
        next(error);
    }
});



export default router;