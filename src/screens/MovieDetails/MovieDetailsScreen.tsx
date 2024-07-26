import {IMAGE_PREFIX} from '@env';
import {useQuery} from '@tanstack/react-query';
import {ErrorFallback, Header, ScreenLoader} from 'components';
import {Cast, Movie} from 'models/movie';
import {MovieDetailsScreenProps} from 'models/navigation';
import React, {FC} from 'react';
import {FlatList, ScrollView, Text, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import apiService from 'services/apiService';
import {formatMovieGenres} from 'utils/formatting.util';

import styles from './MovieDetailsScreen.styles';

const MovieDetailsScreen: FC<MovieDetailsScreenProps> = ({route}) => {
  const {movieId} = route.params;

  const {data, isLoading, error} = useQuery({
    queryKey: [`movieDetails${movieId} `],
    queryFn: () => apiService.fetchMovieDetails(movieId),
  });

  const renderCastItem = ({item}: {item: Cast}) => (
    <View style={styles.castItemContainer}>
      <FastImage
        source={{uri: IMAGE_PREFIX + item.profile_path}}
        style={styles.castItemImage}
        resizeMode="stretch"
      />
      <Text style={styles.castItemName}>{item.name}</Text>
    </View>
  );

  const movie: Movie = data?.data;
  if (isLoading) {
    return <ScreenLoader />;
  } else if (error) {
    return <ErrorFallback />;
  }
  return (
    <View style={styles.container}>
      <Header title={movie.title} />
      <ScrollView>
        <FastImage
          source={{uri: IMAGE_PREFIX + movie.poster_path}}
          style={styles.posterImage}
          resizeMode="stretch"
        />
        <View style={styles.infoContainer}>
          <Text style={styles.title}>{movie.title}</Text>
          <Text style={styles.genres}>{formatMovieGenres(movie?.genres)}</Text>
          <Text>{movie.overview}</Text>
          <Text style={styles.castHeader}>Cast: </Text>
        </View>
        <FlatList
          numColumns={3}
          data={movie?.credits?.cast}
          renderItem={renderCastItem}
          columnWrapperStyle={styles.columnWrapper}
          scrollEnabled={false}
        />
      </ScrollView>
    </View>
  );
};

export default MovieDetailsScreen;
