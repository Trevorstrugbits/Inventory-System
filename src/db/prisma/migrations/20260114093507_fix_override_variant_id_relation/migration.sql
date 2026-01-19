/*
  Warnings:

  - Changed the type of `variantId` on the `CompanyOverageOverride` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `variantId` on the `CompanyQuantityOverride` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "CompanyOverageOverride" DROP CONSTRAINT "CompanyOverageOverride_variantId_fkey";

-- DropForeignKey
ALTER TABLE "CompanyQuantityOverride" DROP CONSTRAINT "CompanyQuantityOverride_variantId_fkey";

-- AlterTable
ALTER TABLE "CompanyOverageOverride" DROP COLUMN "variantId",
ADD COLUMN     "variantId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "CompanyQuantityOverride" DROP COLUMN "variantId",
ADD COLUMN     "variantId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "CompanyOverageOverride_companyId_variantId_key" ON "CompanyOverageOverride"("companyId", "variantId");

-- CreateIndex
CREATE UNIQUE INDEX "CompanyQuantityOverride_companyId_variantId_key" ON "CompanyQuantityOverride"("companyId", "variantId");

-- AddForeignKey
ALTER TABLE "CompanyOverageOverride" ADD CONSTRAINT "CompanyOverageOverride_variantId_fkey" FOREIGN KEY ("variantId") REFERENCES "MaterialVariant"("variantId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompanyQuantityOverride" ADD CONSTRAINT "CompanyQuantityOverride_variantId_fkey" FOREIGN KEY ("variantId") REFERENCES "MaterialVariant"("variantId") ON DELETE CASCADE ON UPDATE CASCADE;
