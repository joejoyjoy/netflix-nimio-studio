"use server";

import { z } from "zod";
import { PrismaClient, Prisma } from "@prisma/client";
const prisma = new PrismaClient();

const ActorSchema = z.object({
  name: z.string().min(2).max(36),
  born: z.coerce.number().gt(1860).lt(2010),
  bio: z.string().min(128).max(512),
});

type Actor = z.infer<typeof ActorSchema>;

export async function uploadActor({ values }: { values: Actor }) {
  try {
    if (!values) {
      return console.error(
        "Error: The value or branch does not contain any data in uploadActor Fn()"
      );
    }

    const validate = ActorSchema.safeParse(values);

    if (validate.success) {
      await prisma.actor.create({
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
    throw new Error(`Failed by uploadActor Fn(): ${error.message}`);
  }
}

export async function getAllActors() {
  try {
    const allActors = await prisma.actor.findMany({});

    return JSON.parse(JSON.stringify(allActors));
  } catch (error: any) {
    throw new Error(`Failed by getAllActors Fn(): ${error.message}`);
  }
}

export async function getActorById(id: string) {
  try {
    const foundActor = await prisma.actor.findUnique({
      where: {
        id,
      },
    });

    return JSON.parse(JSON.stringify(foundActor));
  } catch (error: any) {
    throw new Error(`Failed by getActorById Fn(): ${error.message}`);
  }
}

export async function deleteActorById(id: string) {
  try {
    const deletedActor = await prisma.actor.delete({
      where: {
        id,
      },
    });

    return JSON.parse(JSON.stringify(deletedActor));
  } catch (error: any) {
    throw new Error(`Failed by deleteActorById Fn(): ${error.message}`);
  }
}

export async function modifyActor(id: string, values) {
  try {
    const validate = ActorSchema.safeParse(values);

    if (validate.success) {
      await prisma.actor.update({
        where: {
          id,
        },
        data: {
          name: values.name,
          born: Number(values.born),
          bio: values.bio,
        },
      });
    }

    return JSON.parse(JSON.stringify(validate));
  } catch (error: any) {
    throw new Error(`Failed by modifyActor Fn(): ${error.message}`);
  }
}
