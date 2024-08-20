// Run this script using npx ts-node .\database.ts

import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";

const connectionString = `${process.env.DATABASE_URL}`;

const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

export async function main(userName: string, userEmail: string) {
  try {
    // Create a new user
    const newUser = await prisma.user.create({
      data: {
        name: userName,
        email: userEmail
      }
    });
    console.log("Created new user:", newUser);

    // Fetch all users
    const allUsers = await prisma.user.findMany();
    console.log("All users:", allUsers);
  } catch (error) {
    console.error("Error occurred while interacting with the database:", error);
  } finally {
    await prisma.$disconnect();
    console.log("Prisma disconnected");
  }
}
