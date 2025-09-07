import bcrypt from "bcrypt";
import { InvalidPasswordError, UserNotFoundError } from "../errors";
import { FastifyZodRequest } from "../types/helper";
import { jwtToken, JwtToken } from "../schemas/user.schema";
import { LoginInput } from "../schemas/auth.schema";
import { PrismaClient } from "@prisma/client";
import { JWT } from "@fastify/jwt";

export async function getJWT(req: FastifyZodRequest): Promise<JwtToken> {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    throw new Error("Authorization token is missing");
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    throw new Error("Invalid authorization header");
  }

  const decodedToken = await req.jwtVerify();
  return jwtToken.parse(decodedToken); // Validate the structure
}

export async function login({
  loginInput,
  prisma,
  jwt,
}: {
  loginInput: LoginInput;
  prisma: PrismaClient;
  jwt: JWT;
}) {
  const { email, password } = loginInput;
  const user = await prisma.users.findUnique({ where: { email } });
  if (!user) {
    throw new UserNotFoundError("User not found");
  }
  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    throw new InvalidPasswordError("Invalid password");
  }

  // Generate JWT token
  const token = jwt.sign(
    {
      id: user.id,
      name: user.name,
      surname: user.surname,
      email: user.email,
    },
    { expiresIn: "1h" }
  );

  return {
    token,
  };
}
