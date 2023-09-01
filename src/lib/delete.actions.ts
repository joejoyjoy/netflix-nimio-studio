"use server";

import { deleteMovieById } from "./movie.actions";
import { deleteDirectorById } from "./director.actions";
import { deleteCategoryById } from "./category.actions";
import { deleteActorById } from "./actor.actions";

export async function deleteItemById({
  id,
  branch,
}: {
  id: string;
  branch: string;
}) {
  try {
    if (!id || !branch) {
      return console.error(
        "Error: The id or branch does not contain any data in deleteItemById Fn()"
      );
    }

    if (branch === "movie") {
      const response = await deleteMovieById(id);
      return response;
    }

    if (branch === "director") {
      const response = await deleteDirectorById(id);
      return response;
    }

    if (branch === "category") {
      const response = await deleteCategoryById(id);
      return response;
    }

    if (branch === "actor") {
      const response = await deleteActorById(id);
      return response;
    }

    const err = {
      success: "NOT_FOUND",
    };

    return err;
  } catch (error: any) {
    throw new Error(`Failed by deleteItemById Fn(): ${error.message}`);
  }
}
