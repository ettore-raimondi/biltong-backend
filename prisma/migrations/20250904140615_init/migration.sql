/*
  Warnings:

  - You are about to drop the column `airFlow` on the `biltong_batches` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `biltong_batches` table. All the data in the column will be lost.
  - You are about to drop the column `deletedAt` on the `biltong_batches` table. All the data in the column will be lost.
  - You are about to drop the column `marinadeTime` on the `biltong_batches` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `biltong_batches` table. All the data in the column will be lost.
  - You are about to drop the column `weightLoss` on the `biltong_batches` table. All the data in the column will be lost.
  - You are about to drop the column `initialWeight` on the `meat_pieces` table. All the data in the column will be lost.
  - You are about to drop the column `pieceNumber` on the `meat_pieces` table. All the data in the column will be lost.
  - Added the required column `air_flow` to the `biltong_batches` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `biltong_batches` table without a default value. This is not possible if the table is not empty.
  - Added the required column `weight_loss` to the `biltong_batches` table without a default value. This is not possible if the table is not empty.
  - Added the required column `initial_weight` to the `meat_pieces` table without a default value. This is not possible if the table is not empty.
  - Added the required column `piece_number` to the `meat_pieces` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "biltong_batches" DROP COLUMN "airFlow",
DROP COLUMN "createdAt",
DROP COLUMN "deletedAt",
DROP COLUMN "marinadeTime",
DROP COLUMN "updatedAt",
DROP COLUMN "weightLoss",
ADD COLUMN     "air_flow" INTEGER NOT NULL,
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "deleted_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "marinade_time" TEXT,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "weight_loss" DOUBLE PRECISION NOT NULL;

-- AlterTable
ALTER TABLE "meat_pieces" DROP COLUMN "initialWeight",
DROP COLUMN "pieceNumber",
ADD COLUMN     "initial_weight" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "piece_number" INTEGER NOT NULL;
