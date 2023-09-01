"use server";

import { z } from "zod";
import { PrismaClient, Prisma } from "@prisma/client";
import { uploadPhoto } from "./coverUpload.actions";
const prisma = new PrismaClient();

const MovieSchema = z.object({
  title: z.string().min(2).max(46),
  overview: z.string().min(128).max(512),
  year: z.coerce.number().gt(1970).lt(2024),
  duration: z.coerce.number().gt(30).lt(240),
  cover: z.object({
    public_id: z.string().max(256).optional(),
    secure_url: z.string().max(256).optional(),
  }),
  director: z.array(z.string()),
  category: z.array(z.string()),
  actor: z.array(z.string()),
});

type Movie = z.infer<typeof MovieSchema>;

export async function uploadMovie({ values }: { values: Movie }) {
  try {
    if (!values) {
      return console.error(
        "Error: The value or branch does not contain any data in uploadMovie Fn()"
      );
    }

    const uploadPicture = await uploadPhoto(values.cover);

    const validate = MovieSchema.safeParse(values);

    if (validate.success) {
      const res = await prisma.movie.create({
        data: {
          title: values.title,
          overview: values.overview,
          year: Number(values.year),
          duration: Number(values.duration),
          cover: {
            create: {
              public_id: uploadPicture.public_id,
              secure_url: uploadPicture.secure_url,
            },
          },
          director: {
            connect: {
              id: values.director[0],
            },
          },
          actors: {
            connect: values.actor.map((actorId) => ({
              id: actorId,
            })),
          },
          categories: {
            connect: values.category.map((categoryId) => ({
              id: categoryId,
            })),
          },
        },
        include: {
          categories: true,
          actors: true,
        },
      });
      console.log(res);
    }

    console.log(validate.error);

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
    throw new Error(`Failed by uploadMovie Fn(): ${error.message}`);
  }
}
