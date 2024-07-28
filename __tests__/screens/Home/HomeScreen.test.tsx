import {RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {fireEvent, waitFor} from '@testing-library/react-native';
import {MainStackParamList} from 'models/navigation';
import React from 'react';
import {HomeScreen} from 'screens';
import apiService from 'services/apiService';

import {renderWithProviders} from '../../__utils__/test.utils';

jest.mock('services/apiService', () => ({
  fetchMovies: jest.fn(),
}));

const mockMoviesResponse = {
  data: {
    page: 1,
    total_pages: 1,
    results: [
      {id: '1', title: 'Movie 1'},
      {id: '2', title: 'Movie 2'},
    ],
  },
};

const mockFetchMoviesReturn = ({shouldFail}: {shouldFail: boolean}) => {
  if (shouldFail) {
    (apiService.fetchMovies as jest.Mock).mockRejectedValue(
      new Error('Failed to fetch'),
    );
  } else {
    (apiService.fetchMovies as jest.Mock).mockResolvedValue(mockMoviesResponse);
  }
};

type MockNavigation = NativeStackNavigationProp<MainStackParamList, 'Home'>;
type MockRoute = RouteProp<MainStackParamList, 'Home'>;
const mockNavigation: MockNavigation = {
  navigate: jest.fn(),
  goBack: jest.fn(),
} as any;

const mockRoute: MockRoute = {
  key: 'Home',
  name: 'Home',
  params: undefined,
} as any;

const renderHomeScreenWithProviders = () =>
  renderWithProviders(
    <HomeScreen route={mockRoute} navigation={mockNavigation} />,
  );

describe('Home Screen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders activity indicator when loading', () => {
    mockFetchMoviesReturn({shouldFail: false});
    const {getByTestId} = renderHomeScreenWithProviders();
    expect(getByTestId('test:id/loadingIndicator')).toBeTruthy();
  });

  it('renders movies list correctly', async () => {
    mockFetchMoviesReturn({shouldFail: false});

    const {getByText} = renderHomeScreenWithProviders();

    await waitFor(() => {
      expect(getByText('Movie 1')).toBeTruthy();
      expect(getByText('Movie 2')).toBeTruthy();
    });
  });

  it('calls fetchMovies when search input changes', async () => {
    mockFetchMoviesReturn({shouldFail: false});

    const {getByPlaceholderText, getByText, queryByTestId} =
      renderHomeScreenWithProviders();
    const searchInput = getByPlaceholderText('Search');

    fireEvent.changeText(searchInput, 'Inception');

    await waitFor(() =>
      expect(queryByTestId('test:id/loadingIndicator')).toBeFalsy(),
    );

    await waitFor(() => {
      expect(getByText('Movie 1')).toBeTruthy();
      expect(getByText('Movie 2')).toBeTruthy();
    });
  });

  it('shows error fallback component when fetch request fails', async () => {
    mockFetchMoviesReturn({shouldFail: true});

    const {getByText, queryByTestId} = renderHomeScreenWithProviders();

    await waitFor(() =>
      expect(queryByTestId('test:id/loadingIndicator')).toBeFalsy(),
    );

    await waitFor(() => {
      const errorText = getByText(
        'Something went wrong, please try again later.',
      );
      expect(errorText).toBeTruthy();
    });
  });

  test('navigates to movie details on item press', async () => {
    mockFetchMoviesReturn({shouldFail: false});
    const {getByText, queryByTestId} = renderHomeScreenWithProviders();

    await waitFor(() =>
      expect(queryByTestId('test:id/loadingIndicator')).toBeFalsy(),
    );

    await waitFor(() => {
      const movieItem = getByText('Movie 1');
      fireEvent.press(movieItem);

      expect(mockNavigation.navigate).toHaveBeenCalledWith('MovieDetails', {
        movieId: '1',
      });
    });
  });
});
