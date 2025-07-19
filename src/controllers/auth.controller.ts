import { FastifyRequest, FastifyReply } from "fastify";
import { login } from "../services/auth.service";

export async function handleAuth(req: FastifyRequest, res: FastifyReply) {
  const result = await login(req.body as { email: string; password: string });
  res.send(result);
}

export async function handleTest(req: FastifyRequest, res: FastifyReply) {
  res.send({ message: "Test endpoint is working!" });
}
