import { FastifyPluginAsync } from "fastify";
import { zodToJsonSchema } from "zod-to-json-schema";
import {
  batchSchema,
  batchSchemaInput,
  deactivateBatchInputSchema,
} from "../schemas/batch.schema";
import {
  handleCreateBatch,
  handleDeactivateBatch,
  handleDeleteBatch,
  handleFetchBatches,
} from "../controllers/batch.controller";
import z from "zod";

export const batchRoutes: FastifyPluginAsync = async (app) => {
  app.post(
    "/",
    {
      schema: {
        body: zodToJsonSchema(batchSchemaInput),
        response: {
          201: zodToJsonSchema(batchSchema),
        },
      },
    },
    handleCreateBatch
  );

  app.post(
    "/deactivate",
    {
      body: zodToJsonSchema(deactivateBatchInputSchema),
      response: {
        204: { description: "Batch successfully deactivated" },
      },
    },
    handleDeactivateBatch
  );

  app.post(
    "/delete",
    {
      schema: {
        body: zodToJsonSchema(deactivateBatchInputSchema),
        response: {
          204: { description: "Batch successfully deleted" },
        },
      },
    },
    handleDeleteBatch
  );

  app.get(
    "/",
    { response: { 200: zodToJsonSchema(z.array(batchSchema)) } },
    handleFetchBatches
  );
};
