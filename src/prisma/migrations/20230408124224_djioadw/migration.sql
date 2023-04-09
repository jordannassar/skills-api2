/*
  Warnings:

  - Added the required column `userEmail` to the `post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userName` to the `post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userYearBorn` to the `post` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "post" ADD COLUMN     "userEmail" VARCHAR(255) NOT NULL,
ADD COLUMN     "userName" VARCHAR(255) NOT NULL,
ADD COLUMN     "userYearBorn" INTEGER NOT NULL;
