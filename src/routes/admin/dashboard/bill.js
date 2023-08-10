import express  from 'express';
import checkAuth  from '../../authorization/checkAuth.js';
import prisma from '../../../db/prisma.js';

// Validation
import { requestValidator } from '../../../middleware/requestValidator.js';
import { FromTo } from '../../../validators/FilterWithDate.js'

const router = express.Router();

router.get('/', checkAuth(["admin"]), requestValidator({query: FromTo}), async (req, res, next) => {
    try {
        const {diagnosticId} = req.user;

        // Query
        let query = {
            diagnosticId, 
            createdAt: {gte: req.query.from, lte: req.query.to},
        }

        // Fetech from db
        const bill = await prisma.bill.aggregate({
            where: query,
            _sum: {
                totalAmout: true,
                paidAmount: true
            },
            _count: {
                id: true,
            }
        })

        const dailyExpense = await prisma.dailyExpense.aggregate({
            where: query,
            _sum: {
                amount: true
            },
            _count: {
                id: true
            }
        })

        const differenceTime = new Date(2 * req.query.from - req.query.to);

        query.createdAt = {gte: differenceTime, lte: req.query.from}

        const preBill = await prisma.bill.aggregate({
            where: query,
            _sum: {
                totalAmout: true,
                paidAmount: true
            },
            _count: {
                id: true,
            }
        })

        res.json({
            message: 'Bill Dashboard',
            data: {
                billTotalAmout: bill._sum.totalAmout, 
                billPaidAmount: bill._sum.paidAmount,
                billCount: bill._count.id,
                preBillTotalAmout: preBill._sum.totalAmout, 
                preBillPaidAmount: preBill._sum.paidAmount,
                preBillCount: preBill._count.id,
                dailyExpenseAmount: dailyExpense._sum.amount,
                dailyExpenseCount: dailyExpense._count.id,
            }
        });
    }
    catch(error) {
        next(error);
    }
});



export default router;