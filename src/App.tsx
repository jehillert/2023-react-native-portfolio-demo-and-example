import 'react-native-gesture-handler';

import React, { useEffect } from 'react';
import codePush from 'react-native-code-push';
import { ThemeProvider } from 'styled-components/native';
import { LogBox, StatusBar, useColorScheme } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';

import { StackNavigator } from './navigation';
import { initSentry, Sentry } from './integrations';
import { theme } from './theme';
import AppWrapper from './AppWrapper';
import { codePushOptions, useCodePush } from './integrations/useCodePush';

LogBox.ignoreAllLogs();

initSentry();

let App = () => {
  const themeVariant = useColorScheme() ?? 'light';
  const isDarkMode = themeVariant === 'dark';
  const thm = theme[themeVariant];
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  useCodePush();

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

App = codePush(codePushOptions)(Sentry.wrap(App));

export default App;
