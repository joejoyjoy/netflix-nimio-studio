export const suggestedMovies = (
  movies: Array<MovieIncludeCategory>,
  idToRemove: string
): Array<MovieIncludeCategory> => {
  const updatedMovies = movies.filter((movie) => movie.id !== idToRemove);
  return updatedMovies;
};
