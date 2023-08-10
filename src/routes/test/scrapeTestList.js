import express  from 'express';
import checkAuth  from '../authorization/checkAuth.js';
import TestDataScraper from '../../lib/TestDataScraper.js';
import prisma from '../../db/prisma.js';

const router = express.Router();

const testDataScraper = new TestDataScraper("https://www.populardiagnostic.com");


router.patch('/', checkAuth(["superadmin"]), async (req, res, next) => {
    try {
        // Scrape Data from website
        const tests = await testDataScraper.scrape();
    
        // Save To database (delete previous doctor list & create new lists)
        // Delete previous list
        await prisma.testName.deleteMany({where: {}});

        // Save to db
        const testList = await prisma.testName.createMany({data: tests, skipDuplicates: true});


        res.json({
            message: 'Scraped Test Data',
            data: testList
        });
    }
    catch(error) {
        next(error);
    }
});



export default router;