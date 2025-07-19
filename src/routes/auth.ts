import { FastifyPluginAsync } from "fastify";
import { handleAuth, handleTest } from "../controllers/auth.controller";

const authRoutes: FastifyPluginAsync = async (fastify) => {
  fastify.post("/login", handleAuth);
  fastify.get("/test", handleTest);
};

export default authRoutes;
