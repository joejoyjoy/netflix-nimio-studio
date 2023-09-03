"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { getAllMoviesAndInclude } from "@/lib/movie.actions";
import { downScaleImage } from "@/utils/downScaleImage";
import { minutesToHours } from "@/utils/minutesToHours";
import { categoriesToString } from "@/utils/categoriesToString";
import PersonCard from "../UI/PersonCard";
import MovieCard from "../UI/MovieCard";
import { suggestedMovies } from "@/utils/suggestedMovies";

export default function DialogMovieContent({
  data,
}: {
  data: MovieIncludeAll;
}) {
  const {
    id,
    name,
    cover,
    overview,
    year,
    duration,
    categories,
    director,
    actors,
  } = data;
  const [moviesData, setMoviesData] = useState<Array<MovieIncludeCategory>>([]);

  useEffect(() => {
    const requestData = async () => {
      const res = await getAllMoviesAndInclude();
      setMoviesData(res);
    };
    requestData();
  }, []);

  return (
    <div className="p-8 w-full max-h-[calc(100vh-66px)] overflow-y-auto overflow-hidden">
      <article className="grid grid-cols-[auto,1fr] sm:grid-cols-1 gap-4 mb-4">
        <div className="relative w-48 md:w-32 xs:w-full aspect-[3/4] xs:aspect-[4/5] bg-slate-2 overflow-hidden rounded-md">
          <Image
            src={downScaleImage(cover.secure_url)}
            alt={name}
            className="object-cover"
            fill={true}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 50vw"
            priority
          />
        </div>
        <div className="flex flex-col justify-center gap-3 md:gap-1 sm:gap-3">
          <div>
            <p>Name</p>
            <h3 className="text-lg text-white line-clamp-1">{name}</h3>
          </div>
          <div>
            <p>Overview</p>
            <h3 className="text-sm text-white font-light line-clamp-4 md:line-clamp-2">
              {overview}
            </h3>
          </div>
          <div className="flex gap-8">
            <span>
              <p>Year</p>
              <h3 className="text-lg text-white font-normal">{year}</h3>
            </span>
            <span>
              <p>Duration</p>
              <h3 className="text-lg text-white font-normal">
                {minutesToHours(duration)}
              </h3>
            </span>
            <span>
              <p>Category</p>
              <h3 className="text-lg text-white font-normal line-clamp-1">
                {categoriesToString(categories)}
              </h3>
            </span>
          </div>
        </div>
      </article>
      <section className="flex gap-4">
        <div>
          <p className="text-xl">Director:</p>
          <PersonCard data={director} />
        </div>
        <div>
          <p className="text-xl">Actors:</p>
          <div className="flex gap-2 max-w-[calc(100vw-35rem)] xl:max-w-[calc(100vw-22rem)] lg:max-w-[calc(100vw-17rem)] md:max-w-[calc(100vw-13rem)] overflow-x-auto overflow-hidden">
            {actors.map((actor) => (
              <PersonCard key={actor.id} data={actor} />
            ))}
            {actors.map((actor) => (
              <PersonCard key={actor.id} data={actor} />
            ))}
            {actors.map((actor) => (
              <PersonCard key={actor.id} data={actor} />
            ))}
            {actors.map((actor) => (
              <PersonCard key={actor.id} data={actor} />
            ))}
          </div>
        </div>
      </section>
      <section>
        <p className="mt-8 mb-4 text-2xl text-white">Other movies to watch:</p>
        <div className="grid laptop:grid-cols-3 tablet:grid-cols-2 grid-cols-1 gap-8">
          {suggestedMovies(moviesData, id).map((movie) => (
            <MovieCard key={movie.id} data={movie} />
          ))}
        </div>
      </section>
    </div>
  );
}
