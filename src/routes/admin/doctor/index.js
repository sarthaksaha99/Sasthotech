import express  from 'express';

import getList from './getList.js';
import createDoctor from './createDoctor.js';
import deleteOne from './delete.js';

const router = express.Router();


router.use('/', getList);
router.use('/', createDoctor);
router.use('/', deleteOne);


export default router;

