import bcrypt from "bcrypt";
import { InvalidPasswordError, UserNotFoundError } from "../errors";
import { FastifyZodInstance, FastifyZodRequest } from "../types/helper";
import { jwtToken, JwtToken } from "../schemas/user.schema";

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

export async function login(
  {
    email,
    password,
  }: {
    email: string;
    password: string;
  },
  app: FastifyZodInstance
) {
  const user = await app.prisma.users.findUnique({ where: { email } });
  if (!user) {
    throw new UserNotFoundError("User not found");
  }
  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    throw new InvalidPasswordError("Invalid password");
  }

  // Generate JWT token
  const token = app.jwt.sign(
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
