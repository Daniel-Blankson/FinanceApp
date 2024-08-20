// Run this script using npx ts-node .\database.ts

import { Pool } from 'pg'
import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '@prisma/client'

const connectionString = `${process.env.DATABASE_URL}`

const pool = new Pool({ connectionString })
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })


async function main() {
    // Create a new user
    const newUser = await prisma.user.create({
      data: {
        name: 'Blankson',
        email: 'blankson@example.com',
      },
    });
    console.log('Created new user:', newUser);
  
    // Fetch all users
    const allUsers = await prisma.user.findMany();
    console.log('All users:', allUsers);
  }
  
  main()
    .catch((e) => {
      throw e;
    })
    .finally(async () => {
      await prisma.$disconnect();
    });