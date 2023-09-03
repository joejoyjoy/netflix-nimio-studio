"use client";

import { useContext } from "react";
import { DialogContext } from "@/context/DialogContext";
import DialogMovieContent from "./DialogMovieContent";
import { FaXmark } from "react-icons/fa6";

export default function MovieDialog() {
  const { isDialogOpen, userSelectedMovie, closeMovieDialog } =
    useContext(DialogContext);

  return (
    <>
      <div
        onClick={closeMovieDialog}
        className={`${isDialogOpen ? "movie-dialog-backdrop" : "hidden"}`}
      />
      <section
        className={`${isDialogOpen ? "movie-dialog-content" : "hidden"}`}
      >
        <div>
          <button
            onClick={closeMovieDialog}
            className="absolute top-0 -left-14 text-white"
          >
            <FaXmark size={32} />
          </button>
          {userSelectedMovie !== undefined ? (
            <DialogMovieContent data={userSelectedMovie} />
          ) : (
            <div className="flex justify-center my-10 text-lg">
              No movie selected
            </div>
          )}
        </div>
      </section>
    </>
  );
}
