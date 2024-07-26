import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {MainStackParamList} from 'models/navigation';
import React from 'react';

import {HomeScreen, MovieDetailsScreen} from '../screens';

const Stack = createNativeStackNavigator<MainStackParamList>();

const MainNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="Home">
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="MovieDetails" component={MovieDetailsScreen} />
    </Stack.Navigator>
  );
};

export default MainNavigator;
