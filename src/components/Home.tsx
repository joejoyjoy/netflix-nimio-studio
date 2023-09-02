"use client";

import React, { useEffect, useState } from "react";
import MovieCard from "./UI/MovieCard";
import { getAllMovies } from "@/lib/movie.actions";

export default function Home() {
  const [moviesData, setMoviesData] = useState([]);

  useEffect(() => {
    const requestData = async () => {
      const res = await getAllMovies();
      setMoviesData(res);
    };
    requestData();
  }, []);

  console.log(moviesData);

  return (
    <main className="responsive">
      <div className="responsive_wrapper">
        <div className="grid laptop:grid-cols-3 tablet:grid-cols-2 grid-cols-1 gap-8">
          {moviesData.map((movie) => (
            <MovieCard key={movie.id} data={movie} />
          ))}
        </div>
      </div>
    </main>
  );
}
