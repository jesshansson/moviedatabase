const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

export const fetchPopularMovies = async () => {
  const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US`);
  if (!response.ok) {
    throw new Error('Something went wrong while fetching popular movies');
  }
  const data = await response.json();
  return data.results;
};
export const fetchMovieDetails = async (id: string) => {
    const response = await fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=en-US`);
    if (!response.ok) {
      throw new Error("Something went wrong while fetching popular movies");
    }
    return response.json();
  };