import { PrismaClient } from "@prisma/client";
import {
  FastifyBaseLogger,
  FastifyInstance,
  FastifyReply,
  FastifyRequest,
  FastifySchema,
  RawRequestDefaultExpression,
  RawServerBase,
  RawServerDefault,
  RouteGenericInterface,
  ContextConfigDefault,
  RawReplyDefaultExpression,
} from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import {
  FastifyReplyType,
  FastifyRequestType,
  FastifyTypeProvider,
  FastifyTypeProviderDefault,
  ResolveFastifyReplyType,
  ResolveFastifyRequestType,
} from "fastify/types/type-provider";
import { IncomingMessage } from "http";

export type FastifyZodInstance<
  RawServer extends RawServerBase = RawServerDefault,
  RawRequest extends RawRequestDefaultExpression<RawServer> = RawRequestDefaultExpression<RawServer>,
  RawReply extends RawReplyDefaultExpression<RawServer> = RawReplyDefaultExpression<RawServer>,
  Logger extends FastifyBaseLogger = FastifyBaseLogger
> = FastifyInstance<
  RawServer,
  RawRequest,
  RawReply,
  Logger,
  ZodTypeProvider,
  FastifySchema,
  FastifyTypeProviderDefault,
  IncomingMessage
> & {
  prisma: PrismaClient;
};

export type FastifyZodRequest<
  RouteGeneric extends RouteGenericInterface = RouteGenericInterface,
  RawServer extends RawServerBase = RawServerDefault,
  RawRequest extends RawRequestDefaultExpression<RawServer> = RawRequestDefaultExpression<RawServer>,
  SchemaCompiler extends FastifySchema = FastifySchema,
  ContextConfig = ContextConfigDefault,
  Logger extends FastifyBaseLogger = FastifyBaseLogger,
  TypeProvider extends FastifyTypeProvider = FastifyTypeProviderDefault,
  RequestType extends FastifyRequestType = ResolveFastifyRequestType<
    TypeProvider,
    SchemaCompiler,
    RouteGeneric
  >,
  HttpRequest = IncomingMessage // Add this parameter
> = Omit<
  FastifyRequest<
    RouteGeneric,
    RawServer,
    RawRequest,
    SchemaCompiler,
    ZodTypeProvider, // Force ZodTypeProvider
    ContextConfig,
    Logger,
    RequestType,
    HttpRequest
  >,
  "server"
> & {
  server: FastifyZodInstance;
};

export type FastifyZodReply<
  RouteGeneric extends RouteGenericInterface = RouteGenericInterface,
  RawServer extends RawServerBase = RawServerDefault,
  RawRequest extends RawRequestDefaultExpression<RawServer> = RawRequestDefaultExpression<RawServer>,
  RawReply extends RawReplyDefaultExpression<RawServer> = RawReplyDefaultExpression<RawServer>,
  ContextConfig = ContextConfigDefault,
  SchemaCompiler extends FastifySchema = FastifySchema,
  TypeProvider extends FastifyTypeProvider = FastifyTypeProviderDefault,
  ReplyType extends FastifyReplyType = ResolveFastifyReplyType<
    TypeProvider,
    SchemaCompiler,
    RouteGeneric
  >
> = FastifyReply<
  RouteGeneric,
  RawServer,
  RawRequest,
  RawReply,
  ZodTypeProvider,
  SchemaCompiler,
  TypeProvider,
  ContextConfig,
  ReplyType
>;
