import express  from 'express';

import getList from './getList.js';
import create from './create.js';
import deleteOne from './delete.js';

const router = express.Router();


router.use('/', getList);
router.use('/', create);
router.use('/', deleteOne);


export default router;

