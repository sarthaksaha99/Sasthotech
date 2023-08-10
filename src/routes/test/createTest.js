import express  from 'express';
import checkAuth  from '../authorization/checkAuth.js';
import prisma from '../../db/prisma.js';


// Validator
import { requestValidator } from "../../middleware/requestValidator.js";
import { Test } from "../../validators/test.js";

const router = express.Router();

router.post('/', checkAuth(["superadmin"]), requestValidator({body: Test}), async (req, res, next) => {
    try {
        // Save to db
        const test = await prisma.testName.create({
            data: req.body
        });

        res.json({
            message: 'Added Test Data',
            data: test
        });
    }
    catch(error) {
        next(error);
    }
});



export default router;