import express from 'express';


import auth from './auth/index.js';
import profile from './profile/index.js';
import doctor from './doctor/index.js';
import test from './test/index.js';
import diagnostic from './diagnostic/index.js';
import admin from './admin/index.js';
import bill from './bill/index.js';
import dailyExpense from './dailyExpense/index.js';
import appointment from './appointment/index.js';
import doctorChamber from './doctorChamber/index.js';

const router = express.Router();

router.use('/auth', auth);
router.use('/profile', profile);
router.use('/doctor', doctor);
router.use('/test', test);
router.use('/diagnostic', diagnostic);
router.use('/admin', admin);
router.use('/bill', bill);
router.use('/dailyExpense', dailyExpense);
router.use('/appointment', appointment);
router.use('/doctorchamber', doctorChamber);



export default  router;