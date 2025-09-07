/*
  Warnings:

  - You are about to drop the column `batchId` on the `meat_pieces` table. All the data in the column will be lost.
  - Added the required column `batch_id` to the `meat_pieces` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "meat_pieces" DROP CONSTRAINT "meat_pieces_batchId_fkey";

-- AlterTable
ALTER TABLE "meat_pieces" DROP COLUMN "batchId",
ADD COLUMN     "batch_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "meat_pieces" ADD CONSTRAINT "meat_pieces_batch_id_fkey" FOREIGN KEY ("batch_id") REFERENCES "biltong_batches"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
