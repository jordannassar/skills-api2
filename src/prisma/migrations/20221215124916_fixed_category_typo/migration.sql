-- AlterTable
ALTER TABLE "category" RENAME CONSTRAINT "cateory_pkey" TO "category_pkey";

-- RenameForeignKey
ALTER TABLE "category" RENAME CONSTRAINT "cateory_parentid_foreign" TO "catgeory_parentid_foreign";
