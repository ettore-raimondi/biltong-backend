import Fastify from "fastify";
import cors from "@fastify/cors";
import prisma from "./plugins/prisma";
import routes from "./routes";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import jwt from "./plugins/jwt";
import { FastifyZodRequest } from "./types/helper";

export const buildApp = async () => {
  // Need to use dynamic import to avoid issues with ESM and CJS
  const { default: snakecaseKeys } = await import("snakecase-keys");
  const { default: camelcaseKeys } = await import("camelcase-keys");

  const app = Fastify({
    logger: { transport: { target: "pino-pretty" } },
  }).withTypeProvider<ZodTypeProvider>();
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

  /**
   * Because in postgres we are using snake_case by default, we need to convert
   * all camelCase keys to snake_case before sending data to the database.
   */
  app.addHook("preValidation", async (request: FastifyZodRequest) => {
    if (request.body && typeof request.body === "object") {
      request.body = snakecaseKeys(request.body as Record<string, unknown>, {
        deep: true,
      });
    }
  });

  // Here we do the opposite. Our front end is relying on camelCase keys.
  app.addHook("onSend", async (request: any, reply: any, payload: string) => {
    if (payload) {
      try {
        // Payload is a JSON string at this point!!! parse it first
        const parsed = JSON.parse(payload);
        // Transform to camelCase
        const camelCased = camelcaseKeys(parsed, { deep: true });
        // Return the transformed JSON as a string
        return JSON.stringify(camelCased);
      } catch (e) {
        // If it's not valid JSON or any error occurs, return original payload
        return payload;
      }
    }
    return payload;
  });

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
