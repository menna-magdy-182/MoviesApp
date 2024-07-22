import {NavigationContainer} from '@react-navigation/native';
import React from 'react';

import MainNavigation from './MainNavigator';

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <MainNavigation />
    </NavigationContainer>
  );
};

export default AppNavigator;
