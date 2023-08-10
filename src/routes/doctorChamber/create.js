import express  from 'express';
import checkAuth  from '../authorization/checkAuth.js';
import prisma from '../../db/prisma.js';


// Validator
import { requestValidator } from "../../middleware/requestValidator.js";
import { DoctorChamberCreate } from "../../validators/doctorChamber.js";

const router = express.Router();

router.post('/', checkAuth(["superadmin", "admin"]), requestValidator({body: DoctorChamberCreate}), async (req, res, next) => {
    try {
        const {diagnosticId} = req.user;
        // Save to db
        const doctorChamber = await prisma.doctorChamber.create({
            data: {
                ...req.body,
                diagnosticId
            }
        });

        res.json({
            message: 'Added doctor chamber Data',
            data: doctorChamber
        });
    }
    catch(error) {
        next(error);
    }
});



export default router;