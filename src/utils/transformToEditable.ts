export const transformToEditable = (responseObject: any) => {
  const actorMap = responseObject.actors.map((actor: any) => actor.id);
  const categoryMap = responseObject.categories.map(
    (category: any) => category.id
  );

  const res = {
    name: responseObject.name,
    overview: responseObject.overview,
    year: responseObject.year,
    duration: responseObject.duration,
    cover: {
      public_id: responseObject.cover.public_id,
      secure_url: responseObject.cover.secure_url,
    },
    actor: actorMap,
    director: [responseObject.directorId],
    category: categoryMap,
  };

  return res;
};
