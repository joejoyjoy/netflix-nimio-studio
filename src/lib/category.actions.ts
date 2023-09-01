"use server";

import { z } from "zod";
import { PrismaClient, Prisma } from "@prisma/client";
const prisma = new PrismaClient();

const CategorySchema = z.object({
  name: z.string().min(3).max(13),
});

type Category = z.infer<typeof CategorySchema>;

export async function uploadCategory({ values }: { values: Category }) {
  try {
    if (!values) {
      return console.error(
        "Error: The value or branch does not contain any data in uploadCategory Fn()"
      );
    }

    const validate = CategorySchema.safeParse(values);

    if (validate.success) {
      await prisma.category.create({
        data: {
          name: values.name,
        },
      });
    }

    return JSON.parse(JSON.stringify(validate));
  } catch (error: any) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        const response = {
          success: false,
          error: {
            issues: [
              {
                message:
                  "The inserted name is already used! Change to a different one",
              },
            ],
          },
        };
        return response;
      }
    }
    throw new Error(`Failed by uploadCategory Fn(): ${error.message}`);
  }
}

export async function getAllCategories() {
  try {
    const allCategories = await prisma.category.findMany({});

    return JSON.parse(JSON.stringify(allCategories));
  } catch (error: any) {
    throw new Error(`Failed by getAllCategories Fn(): ${error.message}`);
  }
}
