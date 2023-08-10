import express  from 'express';
import checkAuth  from '../../authorization/checkAuth.js';
import prisma from '../../../db/prisma.js';


// Validator
import { requestValidator } from "../../../middleware/requestValidator.js";
import { LabCreate } from "../../../validators/lab.js";

const router = express.Router();

router.post('/', checkAuth(["admin"]), requestValidator({body: LabCreate}), async (req, res, next) => {
    try {
        const {diagnosticId} = req.user;
        req.body = {
            ...req.body,
            diagnosticId
        }

        // Create Lab
        const lab = await prisma.lab.create({
            data: req.body
        });

        res.json({
            message: 'Lab created',
            data: lab
        });
    }
    catch(error) {
        next(error);
    }
});



export default router;