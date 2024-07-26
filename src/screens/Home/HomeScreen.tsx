import {useInfiniteQuery} from '@tanstack/react-query';
import {ErrorFallback, MovieItem, ScreenLoader, SearchInput} from 'components';
import colors from 'constants/colors';
import {MovieOverview} from 'models/movie';
import {HomeScreenProps} from 'models/navigation';
import React, {FC, useCallback, useMemo, useState} from 'react';
import {ActivityIndicator, FlatList, RefreshControl, View} from 'react-native';
import apiService from 'services/apiService';

import styles from './HomeScreen.styles';

const HomeScreen: FC<HomeScreenProps> = ({navigation}) => {
  const [searchTerm, setSearchTerm] = useState('');

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
    retryDelay: 3000,
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

  if (isLoading) {
    return <ScreenLoader />;
  } else if (error) {
    return <ErrorFallback />;
  }

  return (
    <View style={styles.container}>
      <SearchInput onChangeText={onChangeSearchInputText} />
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
