import express  from 'express';
import checkAuth  from '../authorization/checkAuth.js';
import prisma from '../../db/prisma.js';


// Validator
import { requestValidator } from "../../middleware/requestValidator.js";
import { IdParams } from '../../validators/IdParams.js'

const router = express.Router();

router.delete('/:id', checkAuth(["superadmin"]), requestValidator({params: IdParams}), async (req, res, next) => {
    try {
        const {id} = req.params;

        // Delete Diagnostic & admin user
        const diagnostic = await prisma.$transaction([
            prisma.user.deleteMany({where: {diagnosticId: id}}),
            prisma.diagnostic.delete({where: {id}})
        ]);

        res.json({
            message: 'Diagnostic and diagnostic user is deleted.',
            data: diagnostic
        });
    }
    catch(error) {
        next(error);
    }
});



export default router;