import Fastify from "fastify";
import { PrismaClient } from "@prisma/client";

const fastify = Fastify({ logger: true });
const prisma = new PrismaClient();

// Declare a decorator so Prisma client is accessible in routes
fastify.decorate("prisma", prisma);

fastify.get("/users", async () => {
  return prisma.user.findMany();
});

fastify.post("/users", async (request, reply) => {
  const { email, name } = request.body as { email: string; name?: string };
  const user = await prisma.user.create({ data: { email, name } });
  reply.code(201).send(user);
});

const start = async () => {
  try {
    await fastify.listen({ port: 3000, host: "0.0.0.0" });
    console.log("Server listening on http://localhost:3000");
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
