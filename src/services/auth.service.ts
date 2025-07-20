import bcrypt from "bcrypt";
import { InvalidPasswordError, UserNotFoundError } from "../errors";
import { FastifyZodInstance } from "../types/helper";

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
  const user = await app.prisma.user.findUnique({ where: { email } });
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
