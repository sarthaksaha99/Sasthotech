import express  from 'express';
import bcrypt from 'bcrypt';
import checkAuth  from '../../authorization/checkAuth.js';
import prisma from '../../../db/prisma.js';


// Validator
import { requestValidator } from "../../../middleware/requestValidator.js";
import { UserSignIn } from "../../../validators/user.js";

const router = express.Router();

router.post('/', checkAuth(["admin"]), requestValidator({body: UserSignIn}), async (req, res, next) => {
    try {
        const {diagnosticId} = req.user;
        const {email, password} = req.body;

        // Save to db
        const receptionist = await prisma.user.create({
            data: {
                email,
                password: bcrypt.hashSync(password, 12),
                role: 'receptionist',
                diagnosticId
            }
        });

        res.json({
            message: 'Receptionist is created',
            data: receptionist
        });
    }
    catch(error) {
        next(error);
    }
});



export default router;