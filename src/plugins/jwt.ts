import fp from "fastify-plugin";
import fastifyJwt from "fastify-jwt";
import { FastifyZodReply, FastifyZodRequest } from "../types/helper";

export default fp(async (fastify) => {
  await fastify.register(fastifyJwt, {
    secret: process.env.JWT_SECRET || "super-secret-key",
  });

  fastify.decorate(
    "authenticate",
    async (req: FastifyZodRequest, res: FastifyZodReply) => {
      try {
        await req.jwtVerify();
      } catch (err) {
        res.send(err);
      }
    }
  );
});
