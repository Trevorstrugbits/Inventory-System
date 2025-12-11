/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `Company` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[companyAdminId]` on the table `Company` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `Company` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Company" ADD COLUMN     "companyAdminId" TEXT,
ADD COLUMN     "email" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Company_email_key" ON "Company"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Company_companyAdminId_key" ON "Company"("companyAdminId");

-- CreateIndex
CREATE INDEX "Company_companyAdminId_idx" ON "Company"("companyAdminId");

-- CreateIndex
CREATE INDEX "Company_email_idx" ON "Company"("email");

-- AddForeignKey
ALTER TABLE "Company" ADD CONSTRAINT "Company_companyAdminId_fkey" FOREIGN KEY ("companyAdminId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
