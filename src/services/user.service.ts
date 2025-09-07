import bcrypt from "bcrypt";
import { User } from "../schemas/user.schema";
import { PrismaClient } from "@prisma/client";

export async function createUser({
  user,
  prisma,
}: {
  user: User;
  prisma: PrismaClient;
}): Promise<User> {
  const hashedPassword = await bcrypt.hash(user.password, 10);
  return await prisma.users.create({
    data: { ...user, password: hashedPassword },
  });
}
