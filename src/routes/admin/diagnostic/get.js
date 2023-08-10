import express  from 'express';
import checkAuth  from '../../authorization/checkAuth.js';
import prisma from '../../../db/prisma.js';


const router = express.Router();

router.get('/', checkAuth(['admin', 'receptionist']), async (req, res, next) => {
    try {
        const {diagnosticId} = req.user;
        
        // Fetech from db
        const diagnostic = await prisma.diagnostic.findUnique({
            where: {id: diagnosticId},
            include: {
                users: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        role: true,
                        createdAt: true
                    }
                }
            }
        });

        res.json({
            message: 'Diagnostic Details',
            data: diagnostic
        });
    }
    catch(error) {
        next(error);
    }
});



export default router;