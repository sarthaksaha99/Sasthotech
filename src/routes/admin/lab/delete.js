import express  from 'express';
import checkAuth  from '../../authorization/checkAuth.js';
import prisma from '../../../db/prisma.js';


// Validator
import { requestValidator } from "../../../middleware/requestValidator.js";
import { IdParamsInt } from '../../../validators/IdParams.js'

const router = express.Router();

router.delete('/:id', checkAuth(["admin"]), requestValidator({params: IdParamsInt}), async (req, res, next) => {
    try {
        const {id} = req.params;

        // Delete lab
        const lab = await prisma.lab.delete({where: {id}});

        res.json({
            message: 'Lab is deleted.',
            data: lab
        });
    }
    catch(error) {
        next(error);
    }
});



export default router;