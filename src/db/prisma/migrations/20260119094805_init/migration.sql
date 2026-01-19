-- DropForeignKey
ALTER TABLE "CompanyOverageOverride" DROP CONSTRAINT "CompanyOverageOverride_variantId_fkey";

-- DropForeignKey
ALTER TABLE "CompanyQuantityOverride" DROP CONSTRAINT "CompanyQuantityOverride_variantId_fkey";

-- AlterTable
ALTER TABLE "CompanyOverageOverride" ALTER COLUMN "variantId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "CompanyQuantityOverride" ALTER COLUMN "variantId" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "CompanyOverageOverride" ADD CONSTRAINT "CompanyOverageOverride_variantId_fkey" FOREIGN KEY ("variantId") REFERENCES "MaterialVariant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompanyQuantityOverride" ADD CONSTRAINT "CompanyQuantityOverride_variantId_fkey" FOREIGN KEY ("variantId") REFERENCES "MaterialVariant"("id") ON DELETE CASCADE ON UPDATE CASCADE;
