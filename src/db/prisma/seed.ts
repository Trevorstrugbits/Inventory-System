import { PrismaClient, UserRole } from '@prisma/client';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv'; // Import dotenv

dotenv.config(); // Load environment variables

const prisma = new PrismaClient();

async function main() {
  console.log('Start seeding ...');

  const hashedPassword = await bcrypt.hash('Password123!', 10);

  // 1. Create Super Admin
  const superAdmin = await prisma.user.create({
    data: {
      email: 'superadmin@resinwerks.com',
      password: hashedPassword,
      firstName: 'Super',
      lastName: 'Admin',
      role: UserRole.SUPERADMIN,
    },
  });
  console.log(`Created Super Admin: ${superAdmin.email}`);

  // 2. Create a Company and its Admin
  const companyAdmin = await prisma.user.create({
    data: {
      email: 'admin@company.com',
      password: hashedPassword,
      firstName: 'Company',
      lastName: 'Admin',
      role: UserRole.COMPANY, // This user is the main contact for the company
    },
  });

  const company = await prisma.company.create({
    data: {
      name: 'Test Company',
      email: 'contact@company.com',
      approvedBySuperadmin: true,
      isActive: true,
      companyAdmin: {
        connect: {
          id: companyAdmin.id,
        },
      },
      // Associate the admin user with the company
      users: {
        connect: {
          id: companyAdmin.id
        }
      }
    },
  });
  console.log(`Created Company: ${company.name} with Admin: ${companyAdmin.email}`);

  // 3. Create a Location for the Company
  const location = await prisma.location.create({
    data: {
      name: 'Main Warehouse',
      street: '123 Industrial Way',
      city: 'Anytown',
      state: 'CA',
      postalCode: '12345',
      country: 'USA',
      approvedBySuperadmin: true,
      company: {
        connect: {
          id: company.id,
        },
      },
    },
  });
  console.log(`Created Location: ${location.name} for ${company.name}`);

  // 4. Create an Employee for the Company
  const employee = await prisma.user.create({
    data: {
      email: 'employee@company.com',
      password: hashedPassword,
      firstName: 'John',
      lastName: 'Doe',
      role: UserRole.EMPLOYEE,
      company: {
        connect: {
          id: company.id,
        },
      },
      location: {
        connect: {
          id: location.id,
        },
      },
    },
  });
  console.log(`Created Employee: ${employee.email}`);

  console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
