import express  from 'express';
import createHTTPError from 'http-errors';
import checkAuth from '../authorization/checkAuth.js';
import prisma from '../../db/prisma.js';
import bcrypt from 'bcrypt';

// Validation
import { requestValidator } from '../../middleware/requestValidator.js';
import { UserUpdate } from '../../validators/user.js'

const router = express.Router();

router.patch('/', checkAuth(), requestValidator({body: UserUpdate}), async (req, res, next) => {
    try {
        const {userId} = req.user;

        const {
            password, 
            oldPassword,
            email
        } = req.body;

        if(email) throw createHTTPError(422, 'Can not update email');

        if(password && oldPassword) {
            const user = await prisma.user.findUnique({
                where: {
                    id: userId
                }
            });

            const result = await bcrypt.compare(oldPassword, user.password);

            if(!result) throw createHTTPError(422, 'Invalid old user password');

            req.body.password = await bcrypt.hash(password, 12);
        }
        else {
            delete req.body.password;
        }

        delete req.body.oldPassword;
        
        const user = await prisma.user.update({
            where: {
                id: userId
            },
            data: req.body,
            select: {
                id: true,
                name: true,
                email: true,
            }
        });

        res.json({
            message: 'User data',
            data: user
        });
    }
    catch(error) {
        next(error);
    }
});

export default router;