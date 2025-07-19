import Fastify from "fastify";
import routes from "./routes";
import prisma from "./plugins/prisma";

export const buildApp = () => {
  const app = Fastify({ logger: true });

  // pp.register(cors);
  app.register(prisma);
  app.register(routes);

  return app;
};
