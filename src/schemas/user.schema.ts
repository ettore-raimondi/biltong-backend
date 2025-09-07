import z from "zod";

export const userSchema = z.object({
  name: z.string().min(1).max(50),
  surname: z.string().min(1).max(50),
  email: z.string().email(),
  password: z.string().min(6).max(100),
});

export const loginSchemaInput = z.object({
  email: z.string().email(),
  password: z.string().min(6).max(100),
});

export const loginSchemaResponse = z.object({
  token: z.string(),
});

export const jwtPayloadSchema = z.object({
  username: z.string(),
  iat: z.number(),
  exp: z.number(),
});

export type User = z.infer<typeof userSchema>;

export const jwtToken = z.object({
  id: z.number(),
  name: z.string().min(1).max(50),
  surname: z.string().min(1).max(50),
  email: z.string().email(),
});

export type JwtToken = z.infer<typeof jwtToken>;
