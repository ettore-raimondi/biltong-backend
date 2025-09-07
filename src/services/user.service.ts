import bcrypt from "bcrypt";
import { FastifyZodInstance } from "../types/helper";
import { User } from "../schemas/user.schema";

export async function createUser(
  user: User,
  app: FastifyZodInstance
): Promise<User> {
  const hashedPassword = await bcrypt.hash(user.password, 10);
  return await app.prisma.users.create({
    data: { ...user, password: hashedPassword },
  });
}
