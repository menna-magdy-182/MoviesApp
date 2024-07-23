import {API_KEY, BASE_URL} from '@env';
import React from 'react';
import {Text, View} from 'react-native';

import styles from './HomeScreen.styles';

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <Text>{API_KEY}</Text>
      <Text>{BASE_URL}</Text>
    </View>
  );
};

export default HomeScreen;
