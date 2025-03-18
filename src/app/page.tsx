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
      <h1 className="text-3xl lg:text-4xl font-bold font-limelight mb-4 lg:mb-8 text-white text-center">
        Popular Movies
      </h1>{" "}
      <Link
        href="/search"
        className="text-xl block text-center text-blue-400 underline my-4"
      >
        Search for a movie
      </Link>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 ">
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="border p-4 rounded-lg shadow-lg bg-white flex justify-center"
          >
            <Link href={`/movie/${movie.id}`}>
              <h2 className="text-3xl font-semibold font-zain text-center">
                {movie.title}
              </h2>
              {movie.poster_path && (
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  className="mt-3 rounded-md max-w-48 mx-auto "
                />
              )}
            </Link>
          </div>
        ))}
      </div>
    </main>
  );
}
