import { FastifyPluginAsync } from "fastify";
import { FastifyZodReply, FastifyZodRequest } from "../types/helper";

const healthCheckRoutes: FastifyPluginAsync = async (fastify) => {
  fastify.get(
    "/",
    async (request: FastifyZodRequest, reply: FastifyZodReply) => {
      return { status: "OK", timestamp: new Date() };
    }
  );
};

export default healthCheckRoutes;
