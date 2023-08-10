// Config 
import dotenv from 'dotenv';
dotenv.config();


// Import data
import prisma from './db/prisma.js';
import app from './app.js';


// PORT
const PORT = process.env.PORT || 5000;


async function start() {
    await prisma.$connect();

    app.listen(PORT, () => {
        console.log('\x1b[32m%s\x1b[0m', `Server is running on port ${PORT}`);
    });
}



start()
.catch(error => {
    console.error(error.message);
});