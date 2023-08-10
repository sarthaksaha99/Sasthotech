import express  from 'express';

import get from './get.js';
import update  from './update.js';

const router = express.Router();


router.use('/', get);
router.use('/', update);

export default router;

