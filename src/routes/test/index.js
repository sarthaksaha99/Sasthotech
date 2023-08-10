import express  from 'express';

import getList from './getList.js';
import scrapeTestList  from './scrapeTestList.js';
import postTest from './createTest.js';
import deleteOne from './delete.js';


const router = express.Router();

router.use('/', postTest);
router.use('/', getList);
router.use('/', scrapeTestList);
router.use('/', deleteOne);

export default router;

