import { login } from "../services/auth.service";
import { createUser } from "../services/user.service";
import { loginSchemaInput, userSchema } from "../schemas/user.schema";
import { FastifyZodReply, FastifyZodRequest } from "../types/helper";

export async function handleLogin(
  req: FastifyZodRequest,
  res: FastifyZodReply
) {
  const validatedInput = loginSchemaInput.safeParse(req.body);
  if (!validatedInput.success) {
    res.status(400).send({
      errors: validatedInput.error.issues.map((issue) => issue.message),
    });
    return;
  }
  const result = await login(validatedInput.data, req.server);
  res.send(result);
}

export async function handleRegister(
  req: FastifyZodRequest,
  res: FastifyZodReply
) {
  const validatedInput = userSchema.safeParse(req.body);
  if (!validatedInput.success) {
    res.status(400).send({
      errors: validatedInput.error.issues.map((issue) => issue.message),
    });
    return;
  }

  try {
    const user = await createUser(validatedInput.data, req.server);
    res.send({ user });
  } catch (error: unknown) {
    res.status(400).send({
      errors: error instanceof Error ? error.message : "Unknown error",
    });
  }
}
