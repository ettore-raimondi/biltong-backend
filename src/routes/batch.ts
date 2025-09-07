import { FastifyPluginAsync } from "fastify";
import { zodToJsonSchema } from "zod-to-json-schema";
import { batchSchema, batchSchemaInput } from "../schemas/batch.schema";
import {
  handleCreateBatch,
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

  app.get(
    "/",
    { response: { 200: zodToJsonSchema(z.array(batchSchema)) } },
    handleFetchBatches
  );
};
