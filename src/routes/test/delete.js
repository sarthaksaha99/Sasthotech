import express  from 'express';
import checkAuth  from '../authorization/checkAuth.js';
import prisma from '../../db/prisma.js';


// Validator
import { requestValidator } from "../../middleware/requestValidator.js";
import { IdParamsInt } from '../../validators/IdParams.js'

const router = express.Router();

router.delete('/:id', checkAuth(["superadmin"]), requestValidator({params: IdParamsInt}), async (req, res, next) => {
    try {
        const {id} = req.params;

        // Delete Diagnostic & admin user
        await prisma.testName.delete({where: {id}});

        res.json({
            message: 'Test is deleted.'
        });
    }
    catch(error) {
        next(error);
    }
});



export default router;