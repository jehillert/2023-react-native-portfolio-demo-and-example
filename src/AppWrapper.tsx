import React, { ReactNode } from 'react';
import { useTheme } from 'styled-components/native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { Text } from './comp.common';
import { RootNavigation } from './navigation';
import { store, persistor } from './store/store';
import { config as linkingConfig } from './linking';

type Props = {
  children: ReactNode;
};

const linking = {
  prefixes: ['https://hillert.dev', 'jnotes://'],
  config: linkingConfig,
};

const AppWrapper = ({ children }: Props) => {
  const theme = useTheme();
  const colors = theme?.colors;

  const navTheme = colors
    ? {
        ...DefaultTheme,
        colors: {
          ...DefaultTheme.colors,
          primary: colors.primary.main,
          background: colors.background.default,
          card: colors.background.paper,
          text: colors.text.primary,
          border: colors.text.primary,
          notification: colors.error.main,
        },
      }
    : DefaultTheme;

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <NavigationContainer
            linking={linking}
            fallback={<Text.H6>Loading...</Text.H6>}
            ref={RootNavigation.navigationRef}
            theme={navTheme}>
            {children}
          </NavigationContainer>
        </GestureHandlerRootView>
      </PersistGate>
    </Provider>
  );
};

export default AppWrapper;
