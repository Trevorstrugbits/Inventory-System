-- AlterTable
ALTER TABLE "MaterialVariant" ADD COLUMN     "quantity" DECIMAL(10,2) NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE "CompanyQuantityOverride" (
    "id" TEXT NOT NULL,
    "companyId" TEXT NOT NULL,
    "variantId" TEXT NOT NULL,
    "quantity" DECIMAL(10,2) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CompanyQuantityOverride_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CompanyQuantityOverride_companyId_variantId_key" ON "CompanyQuantityOverride"("companyId", "variantId");

-- AddForeignKey
ALTER TABLE "CompanyQuantityOverride" ADD CONSTRAINT "CompanyQuantityOverride_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompanyQuantityOverride" ADD CONSTRAINT "CompanyQuantityOverride_variantId_fkey" FOREIGN KEY ("variantId") REFERENCES "MaterialVariant"("id") ON DELETE CASCADE ON UPDATE CASCADE;
