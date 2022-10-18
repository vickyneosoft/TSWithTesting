/**
 * @format
 */

import React, {useMemo} from 'react';
import {SafeAreaView, StatusBar, useColorScheme} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';

// navigator imports
import MainNavigator from './navigation';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = useMemo(
    () => ({
      flex: 1,
      backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    }),
    [isDarkMode],
  );

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <MainNavigator />
    </SafeAreaView>
  );
};

export default App;
