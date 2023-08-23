import z from "zod";

const configValidateSchema = z.object({
  port: z.number().int().min(0).max(60000),
  logger: z.object({
    level: z.string(),
    filePath: z.string(),
  }),
  mongodb: z.object({
    connectionUri: z.string(),
  }),
});

export default configValidateSchema;
