import { BatchInput } from "../schemas/batch.schema";
import {
  createBatch,
  deactivateActiveBatch,
  fetchBatches,
} from "../services/batch.service";
import { FastifyZodReply, FastifyZodRequest } from "../types/helper";
import { getJWT } from "../services/auth.service";

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
