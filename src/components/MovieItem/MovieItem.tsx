import {IMAGE_PREFIX} from '@env';
import {PercentageCircle, Text} from 'components';
import {MovieOverview} from 'models/movie';
import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import FastImage from 'react-native-fast-image';

import styles from './MovieItem.styles';

interface MovieItemProps {
  item: MovieOverview;
  onPressHandler: () => void;
}

const MovieItem = ({item, onPressHandler}: MovieItemProps) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPressHandler}>
      <FastImage
        resizeMode="stretch"
        source={{uri: IMAGE_PREFIX + item.poster_path}}
        style={styles.image}
      />
      <View style={styles.percentageContainer}>
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
