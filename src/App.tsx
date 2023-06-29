import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { ThemeProvider } from 'styled-components/native';
import { LogBox, StatusBar, useColorScheme } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';

import { useMessagingSubscribe, useNotificationsPermission } from './hooks';
import { DrawerNavigator } from './navigation';
import { theme } from './theme';
import AppWrapper from './AppWrapper';
import { persistor, store } from './store/store';

LogBox.ignoreAllLogs();

const App = () => {
  useNotificationsPermission();
  useMessagingSubscribe();

  const themeVariant = useColorScheme() ?? 'light';
  const isDarkMode = themeVariant === 'dark';
  const thm = theme[themeVariant];
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider theme={thm}>
          <StatusBar
            barStyle={isDarkMode ? 'light-content' : 'dark-content'}
            backgroundColor={backgroundStyle.backgroundColor}
          />
          <AppWrapper>
            <DrawerNavigator />
          </AppWrapper>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
