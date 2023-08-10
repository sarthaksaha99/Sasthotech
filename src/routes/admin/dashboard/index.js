import express  from 'express';

import test from './test.js';
import bill from './bill.js';

const router = express.Router();

router.use('/test', test);
router.use('/bill', bill);


export default router;

