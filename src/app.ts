import Fastify from "fastify";
import cors from "@fastify/cors";
import prisma from "./plugins/prisma";
import routes from "./routes";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import jwt from "./plugins/jwt";

export const buildApp = async () => {
  const app = Fastify({ logger: true }).withTypeProvider<ZodTypeProvider>();
  app.register(cors, {
    origin: true, // or specific origin: 'http://localhost:3000'
  });
  await app.register(jwt);
  await app.register(prisma);

  // Register swagger for API documentation
  await app.register(require("@fastify/swagger"), {
    swagger: {
      info: {
        title: "Budget Planner API",
        description: "API documentation for the budget planner",
        version: "1.0.0",
      },
      host: "localhost:3000", // change this if needed
      schemes: ["http"],
      consumes: ["application/json"],
      produces: ["application/json"],
    },
  });

  // Register swagger UI for interactive API documentation by going to localhost:3000/docs
  await app.register(require("@fastify/swagger-ui"), {
    routePrefix: "/docs",
    uiConfig: {
      docExpansion: "full",
      deepLinking: false,
    },
    staticCSP: false,
  });
  // Register routes
  await app.register(routes);

  return app;
};
