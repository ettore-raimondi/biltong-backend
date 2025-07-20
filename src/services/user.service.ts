import { User } from "@prisma/client";
import bcrypt from "bcrypt";
import { createUserInput } from "../types/user";
import { FastifyZodInstance } from "../types/helper";

export async function createUser(
  user: createUserInput,
  app: FastifyZodInstance
): Promise<User> {
  const hashedPassword = await bcrypt.hash(user.password, 10);
  return await app.prisma.user.create({
    data: {
      name: user.name,
      surname: user.surname,
      email: user.email,
      password: hashedPassword,
    },
  });
}
