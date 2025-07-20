import { FastifyPluginAsync } from "fastify";
import { handleLogin, handleRegister } from "../controllers/auth.controller";
import {
  loginSchemaInput,
  loginSchemaResponse,
  userSchema,
} from "../schemas/user.schema";
import zodToJsonSchema from "zod-to-json-schema";

const authRoutes: FastifyPluginAsync = async (app) => {
  app.post(
    "/login",
    {
      schema: {
        body: zodToJsonSchema(loginSchemaInput),
        response: {
          200: zodToJsonSchema(loginSchemaResponse),
        },
      },
    },
    handleLogin
  );

  app.post(
    "/register",
    {
      schema: {
        body: zodToJsonSchema(userSchema),
      },
    },
    handleRegister
  );
};

export default authRoutes;
