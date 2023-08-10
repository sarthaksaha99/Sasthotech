import express from 'express';

import login from './login.js';
import logout from './logout.js';

const router = express.Router();

router.use('/login', login);
router.use('/logout', logout);


export default router;
