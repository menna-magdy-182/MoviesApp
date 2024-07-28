import {fireEvent, render} from '@testing-library/react-native';
import MovieItem from 'components/MovieItem/MovieItem';
import {MovieOverview} from 'models/movie';
import React from 'react';

jest.mock('components/AnimatedPoster/AnimatedPoster', () => 'Poster');
jest.mock(
  'components/PercentageCircle/PercentageCircle',
  () => 'PercentageCircle',
);
jest.mock('components/Text/Text', () => 'Text');

describe('MovieItem Component', () => {
  const mockMovie: MovieOverview = {
    id: 1,
    title: 'Inception',
    poster_path: '/inception.jpg',
    vote_average: 8.8,
    release_date: '2010-07-16',
    overview: '',
    genre_ids: [],
    adult: false,
    backdrop_path: '',
    original_language: '',
    original_title: '',
    popularity: 0,
    video: false,
    vote_count: 0,
  };

  const mockOnPressHandler = jest.fn();

  it('renders correctly with given props', () => {
    const {getByText, getByTestId} = render(
      <MovieItem item={mockMovie} onPressHandler={mockOnPressHandler} />,
    );

    expect(getByText('Inception')).toBeTruthy();
    expect(getByText('2010-07-16')).toBeTruthy();
    expect(getByTestId('test:id/poster')).toBeTruthy();
    expect(getByTestId('test:id/percentageCircle')).toBeTruthy();
  });

  const renderMovieItem = () =>
    render(<MovieItem item={mockMovie} onPressHandler={mockOnPressHandler} />);

  it('calls onPressHandler when the item is pressed', async () => {
    const {getByTestId} = renderMovieItem();

    const touchableOpacity = getByTestId('test:id/movieItemContainer');

    fireEvent.press(touchableOpacity);

    expect(mockOnPressHandler).toHaveBeenCalledTimes(1);
  });

  it('displays the movie title, release date', () => {
    const {getByText} = renderMovieItem();
    expect(getByText('Inception')).toBeTruthy();
    expect(getByText('2010-07-16')).toBeTruthy();
  });
});
