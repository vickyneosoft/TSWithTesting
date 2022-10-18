import React, {useMemo} from 'react';
import {NavigationContainer} from '@react-navigation/native';

// navigator imports
import AuthNavigator from './AuthNavigator';
import AppNavigator from './AppNavigator';

const MainNavigator = () => {
  const isSignedIn = false;

  const renderNavigator = useMemo(
    (): React.ReactNode => (isSignedIn ? <AppNavigator /> : <AuthNavigator />),
    [isSignedIn],
  );

  return <NavigationContainer>{renderNavigator}</NavigationContainer>;
};

export default MainNavigator;
