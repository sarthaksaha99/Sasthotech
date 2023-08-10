import express  from 'express';
import checkAuth  from '../authorization/checkAuth.js';
import DoctorDataScraper from '../../lib/DoctorDataScraper.js';
import prisma from '../../db/prisma.js';

const router = express.Router();

const doctorDataScraper = new DoctorDataScraper("https://www.rajdoc.com");


router.patch('/', checkAuth(["superadmin"]), async (req, res, next) => {
    try {
        // Scrape Data from website
        const doctors = await doctorDataScraper.scrape();
    
        // Save To database (delete previous doctor list & create new lists)
        // Delete previous list
        await prisma.doctor.deleteMany({where: {}});

        // Save to db
        const doctorList = await prisma.doctor.createMany({data: doctors, skipDuplicates: true});


        res.json({
            message: 'Scraped Doctor Data',
            data: doctorList
        });
    }
    catch(error) {
        next(error);
    }
});



export default router;