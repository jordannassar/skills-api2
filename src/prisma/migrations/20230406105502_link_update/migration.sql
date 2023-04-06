/*
  Warnings:

  - You are about to drop the column `postLink` on the `post` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "post" DROP COLUMN "postLink",
ADD COLUMN     "imageLink" VARCHAR(255),
ADD COLUMN     "link" VARCHAR(255);
