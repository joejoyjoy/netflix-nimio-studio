"use server";

import { PrismaClient } from "@prisma/client";
import { uploadMovie } from "./movie.actions";
import { uploadDirector } from "./director.actions";
import { uploadCategory } from "./category.actions";
import { uploadActor } from "./actor.actions";
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
        "Error: The value or branch does not contain any data in uploadItemForm Fn()"
      );
    }

    if (branch === "movie") {
      const response = await uploadMovie({ values });
      return response;
    }

    if (branch === "director") {
      const response = await uploadDirector({ values });
      return response;
    }

    if (branch === "category") {
      const response = await uploadCategory({ values });
      return response;
    }

    if (branch === "actor") {
      const response = await uploadActor({ values });
      return response;
    }

    const err = {
      success: "NOT_FOUND",
    };

    return err;
  } catch (error: any) {
    throw new Error(`Failed by uploadItemForm Fn(): ${error.message}`);
  }
}
