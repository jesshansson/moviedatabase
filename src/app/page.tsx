import { fetchPopularMovies } from "@/services/tmdbService";
import Link from "next/link";

type Movie = {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
};

export default async function HomePage() {
  const movies: Movie[] = await fetchPopularMovies();

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Popular Movies</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {movies.map((movie) => (
          <div key={movie.id} className="border p-4 rounded-lg shadow-lg">
            <Link href={`/movie/${movie.id}`}>
              <h2 className="text-lg font-semibold">{movie.title}</h2>
              {movie.poster_path && (
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  className="mt-2 h-fit rounded-md"
                />
              )}
            </Link>
          </div>
        ))}
      </div>
    </main>
  );
}
