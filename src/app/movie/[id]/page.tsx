import { fetchMovieDetails } from "@/services/tmdbService";
import Link from "next/link";

type MovieDetails = {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
};

export default async function MoviePage({
  params,
}: {
  params: { id: string };
}) {
  const movie: MovieDetails = await fetchMovieDetails(params.id);

  return (
    <main className="p-6">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold">{movie.title}</h1>
        <p className="text-gray-600">Release: {movie.release_date}</p>

        <p className="text-yellow-600 flex flex-row align-center ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="20px"
            viewBox="0 -960 960 960"
            width="20px"
            fill="#F19E39"
            className="mr-2"
          >
            <path d="m243-144 63-266L96-589l276-24 108-251 108 252 276 23-210 179 63 266-237-141-237 141Z" />
          </svg>
          {movie.vote_average} / 10
        </p>

        {movie.poster_path && (
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className="rounded-lg mt-4 max-w-80"
          />
        )}

        <p className="mt-4">{movie.overview}</p>
        <Link href="/">
          <button className="mt-4 bg-blue-800 text-white px-4 py-2 rounded-lg ">
            Go back
          </button>
        </Link>
      </div>
    </main>
  );
}
