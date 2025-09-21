-- CreateTable
CREATE TABLE "weight_measurements" (
    "id" SERIAL NOT NULL,
    "weight" DOUBLE PRECISION NOT NULL,
    "batch_data_id" INTEGER NOT NULL,
    "meat_piece_id" INTEGER NOT NULL,

    CONSTRAINT "weight_measurements_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "batch_data" (
    "id" SERIAL NOT NULL,
    "batch_id" INTEGER NOT NULL,
    "time_stamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "temperature" DOUBLE PRECISION NOT NULL,
    "air_flow" INTEGER NOT NULL,
    "humidity" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "batch_data_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "weight_measurements" ADD CONSTRAINT "weight_measurements_batch_data_id_fkey" FOREIGN KEY ("batch_data_id") REFERENCES "batch_data"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "weight_measurements" ADD CONSTRAINT "weight_measurements_meat_piece_id_fkey" FOREIGN KEY ("meat_piece_id") REFERENCES "meat_pieces"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "batch_data" ADD CONSTRAINT "batch_data_batch_id_fkey" FOREIGN KEY ("batch_id") REFERENCES "biltong_batches"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
