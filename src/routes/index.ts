import { FastifyPluginAsync } from "fastify";
import authRoutes from "./auth";

const routes: FastifyPluginAsync = async (fastify) => {
  fastify.register(authRoutes, { prefix: "/auth" });
};

export default routes;
