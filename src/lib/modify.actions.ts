"use server";

import { PrismaClient } from "@prisma/client";
import { modifyMovie, uploadMovie } from "./movie.actions";
import { modifyDirector, uploadDirector } from "./director.actions";
import { modifyCategory, uploadCategory } from "./category.actions";
import { modifyActor, uploadActor } from "./actor.actions";
const prisma = new PrismaClient();

export async function modifyItemForm({
  id,
  values,
  branch,
}: {
  id: any;
  values: any;
  branch: string;
}) {
  try {
    if (!values || !branch) {
      return console.error(
        "Error: The value or branch does not contain any data in modifyItemForm Fn()"
      );
    }

    if (branch === "movie") {
      const response = await modifyMovie(id, values);
      return response;
    }

    if (branch === "director") {
      const response = await modifyDirector(id, values);
      return response;
    }

    if (branch === "category") {
      const response = await modifyCategory(id, values);
      return response;
    }

    if (branch === "actor") {
      const response = await modifyActor(id, values);
      return response;
    }

    const err = {
      success: "NOT_FOUND",
    };

    return err;
  } catch (error: any) {
    throw new Error(`Failed by modifyItemForm Fn(): ${error.message}`);
  }
}
