import { FastifyPluginAsync } from "fastify";
import authRoutes from "./auth";
import healthCheckRoutes from "./health-check";

const routes: FastifyPluginAsync = async (fastify) => {
  fastify.register(authRoutes, { prefix: "/auth" });
  fastify.register(healthCheckRoutes, { prefix: "/health" });
};

export default routes;
