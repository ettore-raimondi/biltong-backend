/*
  Warnings:

  - Added the required column `user_id` to the `biltong_batches` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "biltong_batches" ADD COLUMN     "user_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "biltong_batches" ADD CONSTRAINT "biltong_batches_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
