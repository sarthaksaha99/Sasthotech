import express  from 'express';

import getAll from './getAll.js';
import getOne from './getOne.js';
import create from './create.js';
import deleteOne from './delete.js';

const router = express.Router();


router.use('/', getAll);
router.use('/', getOne);
router.use('/', create);
router.use('/', deleteOne);


export default router;

