import { login } from "../services/auth.service";
import { createUser } from "../services/user.service";
import { loginSchemaInput, User, userSchema } from "../schemas/user.schema";
import { FastifyZodReply, FastifyZodRequest } from "../types/helper";
import { LoginInput } from "../schemas/auth.schema";

export async function handleLogin(
  req: FastifyZodRequest<{ Body: LoginInput }>,
  res: FastifyZodReply
) {
  const loginInput = req.body;
  const result = await login(loginInput, req.server);
  res.send(result);
}

export async function handleRegister(
  req: FastifyZodRequest<{ Body: User }>,
  res: FastifyZodReply
) {
  try {
    const userInput = req.body;
    const user = await createUser(userInput, req.server);
    res.send({ user });
  } catch (error: unknown) {
    res.status(400).send({
      errors: error instanceof Error ? error.message : "Unknown error",
    });
  }
}
