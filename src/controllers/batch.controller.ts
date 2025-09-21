import { BatchInput, DeactivateBatchInput } from "../schemas/batch.schema";
import {
  createBatch,
  deactivateActiveBatch,
  deleteBatch,
  fetchBatches,
} from "../services/batch.service";
import { FastifyZodReply, FastifyZodRequest } from "../types/helper";
import { getJWT } from "../services/auth.service";

export async function handleDeactivateBatch(
  req: FastifyZodRequest<{ Body: DeactivateBatchInput }>,
  res: FastifyZodReply
) {
  // Right now we just deactivate any active batch for the user
  // In future we might want to deactivate a specific batch by ID - currently only one active batch is supported
  await deactivateActiveBatch({
    prisma: req.server.prisma,
    userId: (await getJWT(req)).id,
  });

  res.status(204).send();
}

export async function handleDeleteBatch(
  req: FastifyZodRequest<{ Body: DeactivateBatchInput }>,
  res: FastifyZodReply
) {
  const { id } = req.body;

  await deleteBatch({
    prisma: req.server.prisma,
    batchId: id,
  });

  res.status(204).send();
}

export async function handleCreateBatch(
  req: FastifyZodRequest<{ Body: BatchInput }>,
  res: FastifyZodReply
) {
  const batchData = req.body;
  // First deactivate the active batch if any
  await deactivateActiveBatch({
    prisma: req.server.prisma,
    userId: (await getJWT(req)).id,
  });

  // Now create the new batch
  const createdBatch = await createBatch({
    batch: batchData,
    userId: (await getJWT(req)).id,
    prisma: req.server.prisma,
  });

  res.status(201).send(createdBatch);
}

export async function handleFetchBatches(
  req: FastifyZodRequest,
  res: FastifyZodReply
) {
  const batches = await fetchBatches({
    prisma: req.server.prisma,
    userId: (await getJWT(req)).id,
  });

  res.status(200).send(batches);
}
