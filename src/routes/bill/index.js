import express  from 'express';

import create from './create.js';
import update from './update.js';
import get from './get.js';
import getAll from './getAll.js';
import deleteOne from './delete.js';

const router = express.Router();

router.use('/', create);
router.use('/', update);
router.use('/', get);
router.use('/', getAll);
router.use('/', deleteOne);


export default router;

