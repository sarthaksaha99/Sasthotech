import express  from 'express';
import checkAuth  from '../authorization/checkAuth.js';
import prisma from '../../db/prisma.js';


// Validator
import { requestValidator } from "../../middleware/requestValidator.js";
import { IdParams } from '../../validators/IdParams.js'

const router = express.Router();

router.delete('/:id', checkAuth(["superadmin", "admin"]), requestValidator({params: IdParams}), async (req, res, next) => {
    try {
        const {id} = req.params;

        // Delete Diagnostic & admin user
        await prisma.doctorChamber.delete({where: {id}});

        res.json({
            message: 'Doctor chamber is deleted.'
        });
    }
    catch(error) {
        next(error);
    }
});



export default router;