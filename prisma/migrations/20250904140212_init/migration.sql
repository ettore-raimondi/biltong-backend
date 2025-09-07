-- CreateTable
CREATE TABLE "BiltongBatch" (
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

    CONSTRAINT "BiltongBatch_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MeatPiece" (
    "id" SERIAL NOT NULL,
    "pieceNumber" INTEGER NOT NULL,
    "initialWeight" DOUBLE PRECISION NOT NULL,
    "batchId" INTEGER NOT NULL,

    CONSTRAINT "MeatPiece_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "BiltongBatch_name_key" ON "BiltongBatch"("name");

-- AddForeignKey
ALTER TABLE "MeatPiece" ADD CONSTRAINT "MeatPiece_batchId_fkey" FOREIGN KEY ("batchId") REFERENCES "BiltongBatch"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
