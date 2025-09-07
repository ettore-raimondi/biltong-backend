/*
  Warnings:

  - You are about to drop the `BiltongBatch` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `MeatPiece` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "MeatPiece" DROP CONSTRAINT "MeatPiece_batchId_fkey";

-- DropTable
DROP TABLE "BiltongBatch";

-- DropTable
DROP TABLE "MeatPiece";

-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "surname" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "biltong_batches" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "marinadeTime" TEXT,
    "seasoning" TEXT,
    "temperature" DOUBLE PRECISION NOT NULL,
    "airFlow" INTEGER NOT NULL,
    "humidity" DOUBLE PRECISION NOT NULL,
    "weightLoss" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "biltong_batches_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "meat_pieces" (
    "id" SERIAL NOT NULL,
    "pieceNumber" INTEGER NOT NULL,
    "initialWeight" DOUBLE PRECISION NOT NULL,
    "batchId" INTEGER NOT NULL,

    CONSTRAINT "meat_pieces_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "biltong_batches_name_key" ON "biltong_batches"("name");

-- AddForeignKey
ALTER TABLE "meat_pieces" ADD CONSTRAINT "meat_pieces_batchId_fkey" FOREIGN KEY ("batchId") REFERENCES "biltong_batches"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
