"use server";

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function getSignedInUserData({
  email,
}: {
  email: UserSession["email"];
}) {
  try {
    if (!email) {
      return console.error(
        "Error: No email value on getSignedInUserData Fn() call"
      );
    }

    const res = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    return JSON.parse(JSON.stringify(res));
  } catch (error: any) {
    throw new Error(`Failed by getSignedInUserData Fn(): ${error.message}`);
  }
}
