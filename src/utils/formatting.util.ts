import {Genre} from 'models/movie';

export const formatMovieGenres = (genres: Genre[]) =>
  genres?.map(genre => genre.name).join(', ');

export const formatVotePercentage = (value: number) => (value * 10).toFixed(0);
