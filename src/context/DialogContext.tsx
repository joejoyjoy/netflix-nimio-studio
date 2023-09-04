import { createContext, useState, ReactNode, useEffect } from "react";

export interface DialogInterface {
  isDialogOpen: boolean;
  userSelectedMovie: MovieIncludeAll | undefined;
  openMovieDialog: (data: MovieIncludeAll) => void;
  closeMovieDialog: () => void;
}

const defaultState = {
  isDialogOpen: false,
  userSelectedMovie: undefined,
  openMovieDialog: () => {},
  closeMovieDialog: () => {},
} as DialogInterface;

export const DialogContext = createContext(defaultState);

export default function DialogProvider({ children }: { children: ReactNode }) {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [userSelectedMovie, setUserSelectedMovie] = useState<
    MovieIncludeAll | undefined
  >(undefined);

  const openMovieDialog = (data: MovieIncludeAll) => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    if (userSelectedMovie !== undefined) {
      closeMovieDialog();
      setTimeout(() => {
        setUserSelectedMovie(data);
        setIsDialogOpen(true);
      }, 300);
    } else {
      setUserSelectedMovie(data);
      setIsDialogOpen(true);
    }
  };

  const closeMovieDialog = () => {
    setUserSelectedMovie(undefined);
    setIsDialogOpen(false);
  };

  useEffect(() => {
    if (isDialogOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.removeAttribute("style");
    }
  }, [isDialogOpen]);

  return (
    <DialogContext.Provider
      value={{
        isDialogOpen,
        userSelectedMovie,
        openMovieDialog,
        closeMovieDialog,
      }}
    >
      {children}
    </DialogContext.Provider>
  );
}
