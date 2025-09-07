import { FastifyPluginAsync } from "fastify";
import authRoutes from "./auth";
import healthCheckRoutes from "./health-check";
import { batchRoutes } from "./batch";

const routes: FastifyPluginAsync = async (fastify) => {
  fastify.register(authRoutes, { prefix: "/auth" });
  fastify.register(healthCheckRoutes, { prefix: "/health" });
  fastify.register(batchRoutes, { prefix: "/batches" });
};

export default routes;
