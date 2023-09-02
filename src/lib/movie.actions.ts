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
  director: z.array(z.string()).refine((arr) => arr.length === 1, {
    message: "Select only one director",
  }),
  category: z.array(z.string()).refine((arr) => arr.length > 0, {
    message: "Category checkbox must not be empty",
  }),
  actor: z.array(z.string()).refine((arr) => arr.length > 0, {
    message: "Actor checkbox must not be empty",
  }),
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
      if (error.code === "P2000") {
        console.error(
          `Invalid data: ${error.meta.target[0].fieldNames.join(
            ", "
          )} is too long.`
        );
        // Display an error message to the user indicating the character limit exceeded
      } else {
        console.error("Prisma error:", error);
      }
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
    } else {
      console.error("Unexpected error:", error);
    }
  }
}

export async function getAllMovies() {
  try {
    const allMovies = await prisma.movie.findMany({
      include: {
        cover: {
          select: {
            public_id: true,
            secure_url: true,
          },
        },
        director: {
          select: {
            id: true,
          },
        },
        actors: {
          select: {
            id: true,
          },
        },
        categories: true,
      },
    });

    return JSON.parse(JSON.stringify(allMovies));
  } catch (error: any) {
    throw new Error(`Failed by getAllMovies Fn(): ${error.message}`);
  }
}

export async function getMovieById(id: string) {
  try {
    const foundMovie = await prisma.movie.findUnique({
      where: {
        id,
      },
      include: {
        cover: {
          select: {
            public_id: true,
            secure_url: true,
          },
        },
        director: {
          select: {
            id: true,
          },
        },
        actors: {
          select: {
            id: true,
          },
        },
        categories: {
          select: {
            id: true,
          },
        },
      },
    });

    return JSON.parse(JSON.stringify(foundMovie));
  } catch (error: any) {
    throw new Error(`Failed by getMovieById Fn(): ${error.message}`);
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

export async function modifyMovie(id: string, values) {
  try {
    const validate = MovieSchema.safeParse(values);

    if (validate.success) {
      console.log(values);
      console.log(values.actor);
      console.log(values.category);

      // Fetch the existing movie data
      const existingMovie = await prisma.movie.findUnique({
        where: {
          id,
        },
        include: {
          actors: true,
          categories: true,
        },
      });

      // Disconnect the existing actors and categories
      const disconnectActors = existingMovie.actors.map((actor) => ({
        id: actor.id,
      }));
      const disconnectCategories = existingMovie.categories.map((category) => ({
        id: category.id,
      }));

      await prisma.movie.update({
        where: {
          id,
        },
        data: {
          name: values.name,
          overview: values.overview,
          year: Number(values.year),
          duration: Number(values.duration),
          director: {
            connect: {
              id: values.director[0],
            },
          },
          actors: {
            disconnect: disconnectActors,
            connect: values.actor.map((actorId) => ({
              id: actorId,
            })),
          },
          categories: {
            disconnect: disconnectCategories,
            connect: values.category.map((categoryId) => ({
              id: categoryId,
            })),
          },
        },
      });
    }

    return JSON.parse(JSON.stringify(validate));
  } catch (error: any) {
    throw new Error(`Failed by modifyMovie Fn(): ${error.message}`);
  }
}
