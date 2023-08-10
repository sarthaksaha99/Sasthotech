import express  from 'express';
import checkAuth  from '../../authorization/checkAuth.js';
import prisma from '../../../db/prisma.js';


// Validator
import { requestValidator } from "../../../middleware/requestValidator.js";
import { TestAdmin } from "../../../validators/test.js";

const router = express.Router();

router.post('/', checkAuth(["admin"]), requestValidator({body: TestAdmin}), async (req, res, next) => {
    try {
        const {diagnosticId} = req.user;
        req.body = {
            ...req.body,
            diagnosticId
        }
        // Save to db
        const test = await prisma.test.create({
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