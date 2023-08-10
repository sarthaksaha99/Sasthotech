import express  from 'express';

import getList from './getList.js';
import postTest from './create.js';
import deleteOne from './delete.js';
import update from './update.js';


const router = express.Router();

router.use('/', postTest);
router.use('/', getList);
router.use('/', deleteOne);
router.use('/', update);

export default router;

