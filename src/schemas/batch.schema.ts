import z from "zod";

// The input schema might differ from the model. Therefore we have separate schemas for input and model.
export const meatPieceSchema = z.object({
  id: z.number(),
  piece_number: z.number().min(1),
  initial_weight: z.number().min(0),
  batch_id: z.number(),
});
export const meatPieceInputSchema = meatPieceSchema.omit({
  id: true,
  batch_id: true,
});

export const batchSchema = z.object({
  id: z.number(),
  name: z.string().min(2).max(100),
  created_at: z.coerce.date().default(() => new Date()),
  updated_at: z.coerce.date().default(() => new Date()),
  deleted_at: z.coerce.date().optional().nullable(),
  marinade_time: z.string().optional().nullable(),
  seasoning: z.string().max(200).optional().nullable(),
  temperature: z.number().min(0),
  humidity: z.number().min(0),
  weight_loss: z.number().min(0),
  air_flow: z.number().min(0),
  meat_pieces: z.array(meatPieceSchema),
});

export const deactivateBatchInputSchema = z.object({
  id: z.number(),
});
export type DeactivateBatchInput = z.infer<typeof deactivateBatchInputSchema>;

export const batchSchemaInput = batchSchema
  .omit({ id: true, created_at: true, updated_at: true, deleted_at: true })
  .extend({
    meat_pieces: z.array(meatPieceInputSchema),
  });
export type Batch = z.infer<typeof batchSchema>;
export type BatchInput = z.infer<typeof batchSchemaInput>;
