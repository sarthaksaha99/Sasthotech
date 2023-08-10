import express  from 'express';

import diagnostic from './diagnostic/index.js';

// import bill from './bill/index.js';
import doctor from './doctor/index.js';
import lab from './lab/index.js';
import receptionist from './receptionist/index.js';
import test from './test/index.js';
import dashboard from './dashboard/index.js';


const router = express.Router();


router.use('/diagnostic', diagnostic);
// router.use('/bill', bill);
router.use('/doctor', doctor);
router.use('/lab', lab);
router.use('/receptionist', receptionist);
router.use('/test', test);
router.use('/dashboard', dashboard);


export default router;

