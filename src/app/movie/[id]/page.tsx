import { fetchMovieDetails } from "@/services/tmdbService";

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
      <h1 className="text-3xl font-bold">{movie.title}</h1>
      <p className="text-gray-600">Release: {movie.release_date}</p>
      <p className="text-yellow-500">{movie.vote_average} / 10</p>

      {movie.poster_path && (
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="rounded-lg mt-4"
        />
      )}

      <p className="mt-4">{movie.overview}</p>
    </main>
  );
}
