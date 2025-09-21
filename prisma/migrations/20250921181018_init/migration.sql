-- DropForeignKey
ALTER TABLE "batch_data" DROP CONSTRAINT "batch_data_batch_id_fkey";

-- DropForeignKey
ALTER TABLE "biltong_batches" DROP CONSTRAINT "biltong_batches_user_id_fkey";

-- DropForeignKey
ALTER TABLE "meat_pieces" DROP CONSTRAINT "meat_pieces_batch_id_fkey";

-- DropForeignKey
ALTER TABLE "weight_measurements" DROP CONSTRAINT "weight_measurements_batch_data_id_fkey";

-- DropForeignKey
ALTER TABLE "weight_measurements" DROP CONSTRAINT "weight_measurements_meat_piece_id_fkey";

-- AddForeignKey
ALTER TABLE "biltong_batches" ADD CONSTRAINT "biltong_batches_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "meat_pieces" ADD CONSTRAINT "meat_pieces_batch_id_fkey" FOREIGN KEY ("batch_id") REFERENCES "biltong_batches"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "weight_measurements" ADD CONSTRAINT "weight_measurements_batch_data_id_fkey" FOREIGN KEY ("batch_data_id") REFERENCES "batch_data"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "weight_measurements" ADD CONSTRAINT "weight_measurements_meat_piece_id_fkey" FOREIGN KEY ("meat_piece_id") REFERENCES "meat_pieces"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "batch_data" ADD CONSTRAINT "batch_data_batch_id_fkey" FOREIGN KEY ("batch_id") REFERENCES "biltong_batches"("id") ON DELETE CASCADE ON UPDATE CASCADE;
