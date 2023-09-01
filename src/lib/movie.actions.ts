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
    public_id: z.string().max(256),
    secure_url: z.string().max(256),
  }),
  director: z.object({
    directorId: z.string(),
  }),
  category: z.object({
    categoryId: z.string(),
  }),
  actor: z.object({
    actorId: z.string(),
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

    /* values = {
      title: "Hellow",
      overview:
        "Some description",
      year: "2001",
      duration: "100",
      cover: {},
      actor: ["6a1aa952-5ba4-4403-b6a8-d54fff58f702"],
      director: ["45785611-82c9-48ab-bd93-68e854a4e61d"],
      category: [
        "43fad919-d029-4d94-acfb-df5dffde7699",
        "bc0af8fe-9745-463e-8374-11a19d7975b4",
      ],
    }; */

    const uploadPicture = await uploadPhoto(values.cover);

    // const validate = MovieSchema.safeParse(values);

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
      },
    });

    console.log(res);

    return JSON.parse(JSON.stringify(res));
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
