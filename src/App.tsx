import React from 'react';
import { DefaultTheme, ThemeProvider } from 'styled-components/native';
import { LogBox, StatusBar, useColorScheme } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { useMessagingSubscribe, useNotificationsPermission } from './hooks';
import { DrawerNavigator } from './navigation';
import { config as linkingConfig } from './linking';
import { Text } from './components';
import { theme } from './theme';

LogBox.ignoreAllLogs();

const linking = {
  prefixes: ['https://hillert.dev', 'jnotes://'],
  config: linkingConfig,
};

const App = () => {
  useNotificationsPermission();
  useMessagingSubscribe();
  const themeVariant = useColorScheme() ?? 'light';
  const isDarkMode = themeVariant === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <ThemeProvider theme={theme[themeVariant] as DefaultTheme}>
      <NavigationContainer
        linking={linking}
        fallback={<Text.H6>Loading...</Text.H6>}>
        <StatusBar
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          backgroundColor={backgroundStyle.backgroundColor}
        />
        <DrawerNavigator />
      </NavigationContainer>
    </ThemeProvider>
  );
};

export default App;
