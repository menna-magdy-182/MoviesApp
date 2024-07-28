import {IMAGE_PREFIX} from '@env';
import {PercentageCircle, Text} from 'components';
import Poster from 'components/AnimatedPoster/AnimatedPoster';
import {MovieOverview} from 'models/movie';
import React from 'react';
import {TouchableOpacity, View} from 'react-native';

import styles from './MovieItem.styles';

interface MovieItemProps {
  item: MovieOverview;
  onPressHandler: () => void;
}
const MovieItem = ({item, onPressHandler}: MovieItemProps) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPressHandler}
      testID="test:id/movieItemContainer">
      <View style={styles.imageContainer} testID="test:id/poster">
        <Poster
          imageUrl={IMAGE_PREFIX + item.poster_path}
          style={styles.image}
        />
      </View>
      <View
        style={styles.percentageContainer}
        testID="test:id/percentageCircle">
        <PercentageCircle value={item.vote_average} />
      </View>
      <Text style={styles.textName} numberOfLines={1}>
        {item.title}
      </Text>
      <Text style={styles.textDate}>{item.release_date}</Text>
    </TouchableOpacity>
  );
};

export default MovieItem;
