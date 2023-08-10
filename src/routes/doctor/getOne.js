import express  from 'express';
import checkAuth  from '../authorization/checkAuth.js';
import prisma from '../../db/prisma.js';

// Validation
import { requestValidator } from '../../middleware/requestValidator.js';
import { IdParams } from '../../validators/IdParams.js'

const router = express.Router();

router.get('/:id', checkAuth(), requestValidator({params: IdParams}), async (req, res, next) => {
    try {
        const {id} = req.params;

        // Fetech from db
        const doctor = await prisma.doctor.findUnique({
            where: {id},
            select: {
                name: true,
	            specialist: true,
	            image: true,
	            designation: true,
	            division: true,
	            link: true,
                doctorChamber: true
            }
        });

        res.json({
            message: 'Doctor data',
            data: doctor
        });
    }
    catch(error) {
        next(error);
    }
});



export default router;