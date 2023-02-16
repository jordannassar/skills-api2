/*
  Warnings:

  - You are about to drop the `postLink` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "postLink" DROP CONSTRAINT "postlink_postid_foreign";

-- AlterTable
ALTER TABLE "post" ADD COLUMN     "postLink" VARCHAR(255);

-- DropTable
DROP TABLE "postLink";
