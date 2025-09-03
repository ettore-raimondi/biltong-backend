import Fastify from "fastify";
import cors from "@fastify/cors";
import prisma from "./plugins/prisma";
import routes from "./routes";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import jwt from "./plugins/jwt";

export const buildApp = async () => {
  const app = Fastify({ logger: true }).withTypeProvider<ZodTypeProvider>();
  app.register(cors, {
    origin: "http://localhost:8080", // or 3000 depending on your React dev server
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // allow all you use
    allowedHeaders: ["Content-Type", "Authorization"], // add custom headers if you send any
    credentials: true, // only if you need cookies/auth
    preflightContinue: false, // let plugin handle OPTIONS
    optionsSuccessStatus: 204, // Chrome likes 204 better than 200
  });
  await app.register(jwt);
  await app.register(prisma);

  // Register swagger for API documentation
  await app.register(require("@fastify/swagger"), {
    swagger: {
      info: {
        title: "Biltong drying API",
        description: "API documentation for the biltong drying app",
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
