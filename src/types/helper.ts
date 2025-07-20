import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";

export type FastifyZodInstance = FastifyInstance<
  any, // RawServer
  any, // RawRequest
  any, // RawReply
  any, // Logger
  ZodTypeProvider, // TypeProvider
  any, // HttpServer
  any, // HttpRequest
  any // HttpResponse
>;

export type FastifyZodRequest = FastifyRequest<
  any, // RouteGeneric
  any, // RawServer
  any, // RawRequest
  any, // SchemaCompiler
  ZodTypeProvider, // TypeProvider
  any, // ContextConfig
  any, // Logger
  any, // RequestType
  any // HttpRequest
>;

export type FastifyZodReply = FastifyReply<
  any, // RouteGeneric
  any, // RawServer
  any, // RawRequest
  any, // SchemaCompiler
  ZodTypeProvider, // TypeProvider
  any, // ContextConfig
  any, // Logger
  any, // RequestType
  any // HttpRequest
>;
