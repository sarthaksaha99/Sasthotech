import express  from 'express';
import checkAuth  from '../../authorization/checkAuth.js';
import prisma from '../../../db/prisma.js';


// Validator
import { requestValidator } from "../../../middleware/requestValidator.js";
import { DoctorAdmin } from "../../../validators/doctor.js";

const router = express.Router();

router.post('/', checkAuth(["admin"]), requestValidator({body: DoctorAdmin}), async (req, res, next) => {
    try {
        const {diagnosticId, division} = req.user;
        // Adding diagnosticId and division
        req.body = {
            ...req.body,
            diagnosticId,
            division
        };

        // Save to db
        const doctor = await prisma.doctor.create({
            data: req.body
        });

        res.json({
            message: 'Added Doctor Data',
            data: doctor
        });
    }
    catch(error) {
        next(error);
    }
});



export default router;