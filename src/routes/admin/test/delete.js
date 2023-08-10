import express  from 'express';
import createHttpError from 'http-errors';
import checkAuth  from '../../authorization/checkAuth.js';
import prisma from '../../../db/prisma.js';


// Validator
import { requestValidator } from "../../../middleware/requestValidator.js";
import { IdParamsInt } from '../../../validators/IdParams.js'

const router = express.Router();

router.delete('/:id', checkAuth(["admin"]), requestValidator({params: IdParamsInt}), async (req, res, next) => {
    try {
        const {diagnosticId} = req.user;
        const {id} = req.params;

        // Delete Diagnostic & admin user
        const {count} = await prisma.test.deleteMany({where: {id, diagnosticId}});

        if(!count) throw createHttpError(404, 'Test Not found');

        res.json({
            message: 'Test is deleted.'
        });
    }
    catch(error) {
        next(error);
    }
});



export default router;