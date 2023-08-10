import express  from 'express';
import checkAuth  from '../authorization/checkAuth.js';
import prisma from '../../db/prisma.js';

// Validation
import { requestValidator } from '../../middleware/requestValidator.js';
import { IdParams } from '../../validators/IdParams.js'

const router = express.Router();

router.get('/:id', checkAuth(['superadmin']), requestValidator({params: IdParams}), async (req, res, next) => {
    try {
        const {id} = req.params;
        
        // Fetech from db
        const diagnostic = await prisma.diagnostic.findUnique({
            where: {id},
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