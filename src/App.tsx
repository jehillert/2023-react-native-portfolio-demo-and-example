import React from 'react';
import { ThemeProvider } from 'styled-components/native';
import { LogBox, StatusBar, useColorScheme } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { useMessagingSubscribe, useNotificationsPermission } from './hooks';
import { DrawerNavigator } from './navigation';
import { theme } from './theme';
import AppWrapper from './AppWrapper';

LogBox.ignoreAllLogs();

const App = () => {
  useNotificationsPermission();
  useMessagingSubscribe();
  const themeVariant = useColorScheme() ?? 'light';
  const isDarkMode = themeVariant === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  const thm = theme[themeVariant];

  return (
    <ThemeProvider theme={thm}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <AppWrapper>
        <DrawerNavigator />
      </AppWrapper>
    </ThemeProvider>
  );
};

export default App;
