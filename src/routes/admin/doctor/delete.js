import express  from 'express';
import checkAuth  from '../../authorization/checkAuth.js';
import prisma from '../../../db/prisma.js';

// Validator
import { requestValidator } from "../../../middleware/requestValidator.js";
import { IdParams } from '../../../validators/IdParams.js'
import createHttpError from 'http-errors';

const router = express.Router();

router.delete('/:id', checkAuth(["admin"]), requestValidator({params: IdParams}), async (req, res, next) => {
    try {
        const {diagnosticId} = req.user;
        const {id} = req.params;

        // Delete Diagnostic & admin user
        const {count} = await prisma.doctor.deleteMany({where: {id, diagnosticId}});

        if(!count) throw createHttpError(404, 'Doctor Not found');

        res.json({
            message: 'Doctor is deleted.'
        });
    }
    catch(error) {
        next(error);
    }
});



export default router;