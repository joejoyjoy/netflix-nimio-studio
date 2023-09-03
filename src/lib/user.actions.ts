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

export async function updateUserToAdmin(id: User["id"]) {
  try {
    if (!id) {
      return console.error("Error: No id value on updateUserToAdmin Fn() call");
    }

    const userIsAdmin = await prisma.user.findUnique({
      where: {
        id,
      },
      select: {
        role: true,
      },
    });

    if (userIsAdmin !== null) {
      const role = userIsAdmin.role === "ADMIN" ? "BASIC" : "ADMIN";
      const updateUsers = await prisma.user.update({
        where: {
          id,
        },
        data: {
          role,
        },
      });

      return JSON.parse(JSON.stringify(updateUsers));
    }
  } catch (error: any) {
    throw new Error(`Failed by getSignedInUserData Fn(): ${error.message}`);
  }
}
