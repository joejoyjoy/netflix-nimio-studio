interface Props {
  id: string;
  name: string;
}

export const categoriesToString = (categories: Array<Props>): string => {
  const genreNames = categories.map((genre) => genre.name);
  return genreNames.join(" / ");
};
