import express  from 'express';
import bcrypt from 'bcrypt';
import checkAuth  from '../authorization/checkAuth.js';
import prisma from '../../db/prisma.js';


// Validator
import { requestValidator } from "../../middleware/requestValidator.js";
import { DiagnosticCreate } from "../../validators/diagnostic.js";

const router = express.Router();

router.post('/', checkAuth(["superadmin"]), requestValidator({body: DiagnosticCreate}), async (req, res, next) => {
    try {
        const {email, password, division} = req.body;

        // Create Diagnostic & admin user
        const diagnostic = await prisma.diagnostic.create({
            data: {
                users: {
                    create: {
                        email,
                        password: bcrypt.hashSync(password, 12),
                        role: 'admin'
                    }
                },
                division
            }
        });

        res.json({
            message: 'Diagnostic and admin user is created.',
            data: diagnostic
        });
    }
    catch(error) {
        next(error);
    }
});



export default router;