/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `category` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "category" DROP CONSTRAINT "catgeory_parentid_foreign";

-- AlterTable
ALTER TABLE "category" ALTER COLUMN "parentId" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "category_name_key" ON "category"("name");
