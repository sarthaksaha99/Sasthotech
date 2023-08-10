import express  from 'express';
import checkAuth  from '../authorization/checkAuth.js';
import prisma from '../../db/prisma.js';


// Validator
import { requestValidator } from "../../middleware/requestValidator.js";
import { BillCreate } from "../../validators/bill.js";
import createHttpError from 'http-errors';

const router = express.Router();

// BillId generator => sample = 200723001 20 07 23 001
const genBillId = (preBillId) => {
    const date = (new Date()).toLocaleDateString().split("/");
    
    const currentDate = `${date[1].padStart(2, '0')}${date[0].padStart(2, '0')}${date[2].slice(2, 4)}`;

    if(currentDate !== preBillId.slice(0, 6)) {
        return `${currentDate}001`;
    }

    const count = parseInt(preBillId.slice(6, 9));

    return `${currentDate}${`${count + 1}`.padStart(3, '0')}`;
}



router.post('/', checkAuth(["admin", "receptionist"]), requestValidator({body: BillCreate}), async (req, res, next) => {
    try {
        const {diagnosticId, userId} = req.user;
        const testIds = req.body.tests.map(({testId}) => testId);

        const testsData = await prisma.test.findMany({where: {id: {in: testIds}}})

        let totalAmout = 0;
        const tests = req.body.tests.map(({testId, quantity}) => {
            const test = testsData.find(value => value.id === testId);

            totalAmout += test.price * quantity;

            return {
                name: test.name,
                price: test.price,
                type: test.type,
                diagnosticId,
                testId,
                quantity
            }
        });

        // Get last billId
        const preBill = await prisma.bill.findFirst({where: {diagnosticId}});

        const bill = await prisma.bill.create({
            data: {
                ...req.body,
                billId: genBillId(preBill?.billId || ''),
                totalAmout,
                userId,
                diagnosticId,
                tests: {
                    createMany: {
                        data: tests
                    }
                }
            }
        });

        res.json({
            message: 'Bill is created.',
            data: bill
        });
    }
    catch(error) {
        next(error);
    }
});



export default router;