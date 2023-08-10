import dotenv from 'dotenv';
dotenv.config();

import bcrypt from 'bcrypt';
import prisma from './src/db/prisma.js';

const {
    SUPER_ADMIN_NAME,
    SUPER_ADMIN_EMAIL,
    SUPER_ADMIN_PASSWORD
} = process.env;

async function setup() {
    try {
        await prisma.$connect();

        await prisma.user.deleteMany({where: {role: "superadmin"}});

        await prisma.user.create({
            data: {
                name: SUPER_ADMIN_NAME,
                email: SUPER_ADMIN_EMAIL,
                password: bcrypt.hashSync(SUPER_ADMIN_PASSWORD, 12),
                role: 'superadmin'
            }
        });

        console.log('\x1b[32m%s\x1b[0m', `Admin User is created.`);
        await prisma.$disconnect();
    }
    catch(error) {
        console.log(error.message);
        await prisma.$disconnect();
    }
}

setup().then();
