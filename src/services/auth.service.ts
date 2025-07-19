import prisma from "../plugins/prisma";

export async function login({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  // const user = await prisma.user.findUnique({ where: { email } });
  return { message: "TEST POINT" };
}
