import express  from 'express';
import checkAuth  from '../authorization/checkAuth.js';
import prisma from '../../db/prisma.js';


const router = express.Router();

router.get('/', checkAuth(), async (req, res, next) => {
    try {
        const {id} = req.params;
        const {diagnosticId} = req.user;

        // Fetech from db
        const chamber = await prisma.doctorChamber.findMany({
            where: {diagnosticId},
            select: {
                id: true,
                place: true,
                time: true,
                phone: true,
                Doctor: {
                    select: {
                        id: true,
                        name: true,
                        specialist: true,
                        image: true,
                    }
                }
            }
        });

        res.json({
            message: 'Doctor Chamber',
            data: chamber
        });
    }
    catch(error) {
        next(error);
    }
});



export default router;