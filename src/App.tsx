import 'react-native-gesture-handler';

import React from 'react';
import { ThemeProvider } from 'styled-components/native';
import { LogBox, StatusBar, useColorScheme } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';

import { StackNavigator } from './navigation';
import { theme } from './theme';
import AppWrapper from './AppWrapper';

LogBox.ignoreAllLogs();

const App = () => {
  const themeVariant = useColorScheme() ?? 'light';
  console.log(themeVariant);
  const isDarkMode = themeVariant === 'dark';
  const thm = theme[themeVariant];
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <ThemeProvider theme={thm}>
      <AppWrapper>
        <StatusBar
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          backgroundColor={backgroundStyle.backgroundColor}
        />
        <StackNavigator />
      </AppWrapper>
    </ThemeProvider>
  );
};

export default App;
