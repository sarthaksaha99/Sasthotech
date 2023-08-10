import express  from 'express';
import bcrypt from 'bcrypt';
import checkAuth  from '../../authorization/checkAuth.js';
import prisma from '../../../db/prisma.js';


// Validator
import { requestValidator } from "../../../middleware/requestValidator.js";
import { DiagnosticUpdate } from "../../../validators/diagnostic.js";

const router = express.Router();

router.patch('/', checkAuth(["admin"]), requestValidator({body: DiagnosticUpdate}), async (req, res, next) => {
    try {
        const {diagnosticId} = req.user;

        // Create Diagnostic & admin user
        const diagnostic = await prisma.diagnostic.update({
            data: req.body,
            where: {id: diagnosticId}
        });

        res.json({
            message: 'Diagnostic updated.',
            data: diagnostic
        });
    }
    catch(error) {
        next(error);
    }
});



export default router;