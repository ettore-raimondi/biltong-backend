import { Batch, BatchInput } from "../schemas/batch.schema";
import { PrismaClient } from "@prisma/client";

export async function createBatch({
  batch,
  userId,
  prisma,
}: {
  batch: BatchInput;
  userId: number;
  prisma: PrismaClient;
}): Promise<Batch> {
  const { meat_pieces, ...batchData } = batch;
  try {
    const result = await prisma.biltong_batches.create({
      data: {
        ...batchData,
        user: {
          connect: { id: userId },
        },
        meat_pieces: {
          create: meat_pieces.map((piece) => piece),
        },
      },
      include: {
        meat_pieces: true,
      },
    });
    return result;
  } catch (error) {
    console.error("Error creating batch:", error);
    throw error;
  }
}

export async function fetchBatches({
  userId,
  prisma,
}: {
  userId: number;
  prisma: PrismaClient;
}): Promise<Batch[]> {
  const batches = await prisma.biltong_batches.findMany({
    where: { user_id: userId },
    include: {
      meat_pieces: true,
    },
  });
  return batches;
}

export async function deactivateActiveBatch({
  userId,
  prisma,
}: {
  userId: number;
  prisma: PrismaClient;
}): Promise<void> {
  // Find the currently active batch (the one without a deleted_at timestamp)
  const activeBatch = await prisma.biltong_batches.findFirst({
    where: {
      user_id: userId,
      deleted_at: null,
    },
  });

  if (activeBatch) {
    // Deactivate the active batch by setting the deleted_at timestamp
    await prisma.biltong_batches.update({
      where: { id: activeBatch.id },
      data: { deleted_at: new Date() },
    });
  }
}
