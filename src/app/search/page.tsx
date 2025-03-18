"use client";

import { useState } from "react";
import { searchMovies } from "@/services/tmdbService";
import Link from "next/link";

type Movie = {
  id: number;
  title: string;
  poster_path: string;
};

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setError("");

    try {
      const results = await searchMovies(query);
      setMovies(results);
    } catch (err) {
      setError("Failed to fetch movies. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="p-6 text-center">
      <h1 className="text-3xl lg:text-4xl font-bold text-white text-center mb-6">
        Search Movies
      </h1>
      <form onSubmit={handleSearch} className="flex justify-center gap-2 mb-6">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for a movie..."
          className="p-2 border rounded-md w-80"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          Search
        </button>
      </form>
      <Link href="/">
        <button className="my-4 bg-blue-800 text-white px-4 py-2 rounded-lg ">
          Go back
        </button>
      </Link>

      {loading && <p className="text-white text-center">Loading...</p>}
      {error && <p className="text-red-500 text-center">{error}</p>}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="border p-4 rounded-lg shadow-lg bg-white"
          >
            <Link href={`/movie/${movie.id}`}>
              <h2 className="text-lg font-semibold text-center">
                {movie.title}
              </h2>
              {movie.poster_path && (
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  className="mt-3 rounded-md max-w-48 mx-auto"
                />
              )}
            </Link>
          </div>
        ))}
      </div>
    </main>
  );
}
