import express  from 'express';
import checkAuth  from '../authorization/checkAuth.js';
import prisma  from '../../db/prisma.js';

const router = express.Router();

router.get('/', checkAuth(), async (req, res, next) => {
    try {
        const {userId} = req.user;
        
        const user = await prisma.user.findUnique({
            where: {
                id: userId
            },
            select: {
                id: true,
                name: true,
                email: true,
                role: true
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