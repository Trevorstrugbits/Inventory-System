/*
  Warnings:

  - A unique constraint covering the columns `[variantId]` on the table `MaterialVariant` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "MaterialVariant" ADD COLUMN     "variantId" SERIAL NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "MaterialVariant_variantId_key" ON "MaterialVariant"("variantId");
