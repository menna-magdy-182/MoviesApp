import {useInfiniteQuery} from '@tanstack/react-query';
import {ErrorFallback, MovieItem, ScreenLoader, SearchInput} from 'components';
import colors from 'constants/colors';
import {Location} from 'models/locations';
import {MovieOverview} from 'models/movie';
import {HomeScreenProps} from 'models/navigation';
import React, {FC, useCallback, useEffect, useMemo, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  Text,
  View,
} from 'react-native';
import apiService from 'services/apiService';
import {getLocation} from 'utils/location.util';

import styles from './HomeScreen.styles';

const HomeScreen: FC<HomeScreenProps> = ({navigation}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [location, setLocation] = useState<Location>();

  // Delay is added to avoid exhaustive network calls on every input text change
  const onChangeSearchInputText = (term: string) =>
    setTimeout(() => {
      setSearchTerm(term);
    }, 3000);

  const {
    isLoading,
    data,
    refetch,
    fetchNextPage,
    isFetchingNextPage,
    error,
    isRefetching,
  } = useInfiniteQuery({
    retryDelay: 5000,
    queryKey: ['moviesListData', searchTerm],
    initialPageParam: 1,
    queryFn: ({queryKey, pageParam = 1}) =>
      apiService.fetchMovies(queryKey[1], pageParam),
    getNextPageParam: lastPage => {
      return lastPage.data.page < lastPage.data.total_pages
        ? lastPage.data.page + 1
        : false;
    },
  });

  const flattenData = useMemo(() => {
    return data?.pages.flatMap(page => page.data.results) || [];
  }, [data?.pages]);

  const onRefreshList = () => refetch();

  const onEndReached = () => fetchNextPage();

  useEffect(() => {
    handleGetLocation();
  }, []);

  const handleGetLocation = async () => {
    const currentLocation = await getLocation();
    currentLocation && setLocation(currentLocation);
  };

  const renderMovieItem = useCallback(
    ({item, index}: {item: MovieOverview; index: number}) => {
      const navigateToMovieDetails = () =>
        navigation.navigate('MovieDetails', {movieId: item.id});

      return (
        <MovieItem
          item={item}
          key={index}
          onPressHandler={navigateToMovieDetails}
        />
      );
    },
    [navigation],
  );

  const renderFooter = () => {
    return isFetchingNextPage ? (
      <ActivityIndicator size="small" color={colors.activityIndicator} />
    ) : null;
  };

  const renderUserLocation = () => {
    return location ? (
      <Text style={styles.locationText}>
        User Location: longitude: {location.longitude}, latitude:{' '}
        {location.latitude}
      </Text>
    ) : null;
  };

  return (
    <View style={styles.container}>
      {renderUserLocation()}
      <SearchInput onChangeText={onChangeSearchInputText} />
      {isLoading && <ScreenLoader />}
      {error && <ErrorFallback />}

      <FlatList<MovieOverview>
        data={flattenData}
        renderItem={renderMovieItem}
        onEndReached={onEndReached}
        columnWrapperStyle={styles.columnWrapper}
        refreshControl={
          <RefreshControl
            refreshing={isRefetching}
            onRefresh={onRefreshList}
            tintColor={colors.activityIndicator}
          />
        }
        numColumns={2}
        ListFooterComponent={renderFooter}
      />
    </View>
  );
};

export default HomeScreen;
