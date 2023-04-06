/*
  Warnings:

  - You are about to drop the column `categoryId` on the `post` table. All the data in the column will be lost.
  - Added the required column `categoryName` to the `post` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "post" DROP CONSTRAINT "post_categoryid_foreign";

-- AlterTable
ALTER TABLE "post" DROP COLUMN "categoryId",
ADD COLUMN     "categoryName" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "post" ADD CONSTRAINT "post_categoryname_foreign" FOREIGN KEY ("categoryName") REFERENCES "category"("name") ON DELETE NO ACTION ON UPDATE NO ACTION;
