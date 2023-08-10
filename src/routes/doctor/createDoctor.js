import express  from 'express';
import checkAuth  from '../authorization/checkAuth.js';
import prisma from '../../db/prisma.js';


// Validator
import { requestValidator } from "../../middleware/requestValidator.js";
import { Doctor } from "../../validators/doctor.js";

const router = express.Router();

router.post('/', checkAuth(["superadmin"]), requestValidator({body: Doctor}), async (req, res, next) => {
    try {
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