import express  from 'express';

import update from './update.js';
import get from './get.js';

const router = express.Router();


router.use('/', update);
router.use('/', get);


export default router;

