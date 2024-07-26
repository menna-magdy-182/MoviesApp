import React from 'react';
import {Text, View} from 'react-native';

import styles from './ErrorFallback.styles';

const ErrorFallback = () => {
  return (
    <View style={styles.container}>
      <Text>Something went wrong, please try again later.</Text>
    </View>
  );
};

export default ErrorFallback;
