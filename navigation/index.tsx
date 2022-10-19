import React, {useMemo} from 'react';
import {NavigationContainer} from '@react-navigation/native';

// navigator imports
import AuthNavigator from './AuthNavigator';
import AppNavigator from './AppNavigator';
import withAuthContextConsumer from '../HOC/withAuthContextConsumer';
import {AuthContextTypes} from '../types';
import withAuthContextProvider from '../HOC/withAuthContextProvider';

const MainNavigator = (props: AuthContextTypes) => {
  const {state} = props;

  const renderNavigator = useMemo(
    (): React.ReactNode =>
      state.userData ? <AppNavigator /> : <AuthNavigator />,
    [state],
  );

  return <NavigationContainer>{renderNavigator}</NavigationContainer>;
};

export default withAuthContextProvider(withAuthContextConsumer(MainNavigator));
