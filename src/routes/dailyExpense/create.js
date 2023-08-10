import express  from 'express';
import checkAuth  from '../authorization/checkAuth.js';
import prisma from '../../db/prisma.js';


// Validator
import { requestValidator } from "../../middleware/requestValidator.js";
import { DailyExpense } from "../../validators/dailyExpense.js";

const router = express.Router();

router.post('/', checkAuth(["admin", "receptionist"]), requestValidator({body: DailyExpense}), async (req, res, next) => {
    try {
        const {diagnosticId} = req.user;
        // Save to db
        const expense = await prisma.dailyExpense.create({
            data: {
                ...req.body,
                diagnosticId
            }
        });

        res.json({
            message: 'Daily expense is added.',
            data: expense
        });
    }
    catch(error) {
        next(error);
    }
});



export default router;