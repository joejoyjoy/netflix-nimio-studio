"use server";

import { z } from "zod";
import { PrismaClient, Prisma } from "@prisma/client";
import { deletePhotoOfCloudinary, uploadPhoto } from "./coverUpload.actions";
const prisma = new PrismaClient();

const MovieSchema = z.object({
  name: z.string().min(2).max(46),
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
      await prisma.movie.create({
        data: {
          name: values.name,
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
      });
    }

    if (!validate.success) {
      deletePhotoOfCloudinary(uploadPicture.public_id);
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
    throw new Error(`Failed by uploadMovie Fn(): ${error.message}`);
  }
}

export async function getAllMovies() {
  try {
    const allMovies = await prisma.movie.findMany({});

    return JSON.parse(JSON.stringify(allMovies));
  } catch (error: any) {
    throw new Error(`Failed by getAllMovies Fn(): ${error.message}`);
  }
}

export async function deleteMovieById(id: string) {
  try {
    const deletedMovie = await prisma.movie.delete({
      where: {
        id,
      },
      include: { cover: true },
    });
    console.log(deletedMovie);

    return JSON.parse(JSON.stringify(deletedMovie));
  } catch (error: any) {
    throw new Error(`Failed by deleteMovieById Fn(): ${error.message}`);
  }
}
