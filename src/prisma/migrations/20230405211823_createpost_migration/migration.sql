-- DropForeignKey
ALTER TABLE "post" DROP CONSTRAINT "post_userid_foreign";

-- AddForeignKey
ALTER TABLE "post" ADD CONSTRAINT "post_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
