"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type Movie = {
  id: number;
  title: string;
  poster_path: string;
};

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<Movie[]>([]);

  useEffect(() => {
    const storedFavorites = localStorage.getItem("favorites");
    if (storedFavorites) {
      try {
        const parsed = JSON.parse(storedFavorites);
        setFavorites(parsed);
      } catch (error) {
        console.error("Could not parse favorites from localStorage", error);
      }
    }
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl lg:text-4xl font-bold font-limelight mb-4 lg:mb-8 text-white text-center">
        My Favorite Movies
      </h1>

      {favorites.length > 0 ? (
        <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {favorites.map((movie) => (
            <Link key={movie.id} href={`/movie/${movie.id}`}>
              <li className="border p-4 rounded-lg shadow-lg bg-white flex-col items-center justify-center">
                {movie.poster_path && (
                  <div className="flex justify-center ">
                    <img
                      src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                      alt={movie.title}
                      className="rounded mb-2"
                    />
                  </div>
                )}
                <p className="font-semibold text-center">{movie.title}</p>
              </li>
            </Link>
          ))}
        </ul>
      ) : (
        <p>You haven’t added any favorites yet. 💔</p>
      )}
    </div>
  );
}
