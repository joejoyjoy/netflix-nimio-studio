export const suggestedMovies = (
  movies: Array<MovieIncludeAll>,
  idToRemove: string
): Array<MovieIncludeAll> => {
  const updatedMovies = movies.filter((movie) => movie.id !== idToRemove);
  return updatedMovies;
};
