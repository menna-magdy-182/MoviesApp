const endpoints = {
  movies: '/discover/movie',
  searchMovies: '/search/movie',
  movieDetails: (movieId: number) => `/movie/${movieId}`,
};

export default endpoints;
