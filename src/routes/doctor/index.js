import express  from 'express';

import getList from './getList.js';
// import getDiagnosticDoctor from './getDiagnosticDoctor.js';
import scrapeDoctorList  from './scrapeDoctorList.js';
import createDoctor from './createDoctor.js';
import deleteOne from './delete.js';
import getOne from './getOne.js';


const router = express.Router();

router.use('/', getOne);
router.use('/', getList);
// router.use('/diagnostic', getDiagnosticDoctor);
router.use('/', scrapeDoctorList);
router.use('/', createDoctor);
router.use('/', deleteOne);


export default router;

