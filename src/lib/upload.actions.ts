"use server";

import { z } from "zod";
import { PrismaClient, Prisma } from "@prisma/client";
const prisma = new PrismaClient();

export async function uploadItemForm({
  values,
  branch,
}: {
  values: any;
  branch: string;
}) {
  try {
    if (!values || !branch) {
      return console.error(
        "Error: The value or branch does not contain any data in postNewDirector Fn()"
      );
    }

    if (branch === "movie") {
    }

    if (branch === "director") {
      const response = await uploadDirector({ values });
      return response;
    }

    if (branch === "category") {
    }

    if (branch === "actor") {
    }

    return JSON.parse(
      JSON.stringify("No branch found with the data provided! Action failed")
    );
  } catch (error: any) {
    throw new Error(`Failed by postNewDirector Fn(): ${error.message}`);
  }
}

const DirectorSchema = z.object({
  name: z.string().min(2).max(36),
  born: z.coerce.number().gt(1860).lt(2010),
  bio: z.string().min(128).max(512),
});

type Director = z.infer<typeof DirectorSchema>;

export async function uploadDirector({ values }: { values: Director }) {
  try {
    if (!values) {
      return console.error(
        "Error: The value or branch does not contain any data in uploadDirector Fn()"
      );
    }

    const validate = DirectorSchema.safeParse(values);

    if (validate.success) {
      await prisma.director.create({
        data: {
          name: values.name,
          born: Number(values.born),
          bio: values.bio,
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
    throw new Error(`Failed by uploadDirector Fn(): ${error.message}`);
  }
}
