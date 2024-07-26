import apiClient from './apiClient';
import endpoints from './endpoints';

const fetchMovies = (query: string, page: number) =>
  !query
    ? apiClient.get(endpoints.movies, {params: {page}})
    : apiClient.get(endpoints.searchMovies, {params: {page, query}});

const fetchMovieDetails = (movieId: number) =>
  apiClient.get(endpoints.movieDetails(movieId), {
    params: {append_to_response: 'credits'},
  });

const apiService = {fetchMovieDetails, fetchMovies};

export default apiService;
