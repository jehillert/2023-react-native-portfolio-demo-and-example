import React, { ReactNode } from 'react';
import { useTheme } from 'styled-components/native';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { config as linkingConfig } from './linking';
import { Text } from './components';
import { RootNavigation } from './navigation';

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
    <NavigationContainer
      linking={linking}
      fallback={<Text.H6>Loading...</Text.H6>}
      ref={RootNavigation.navigationRef}
      theme={navTheme}>
      {children}
    </NavigationContainer>
  );
};

export default AppWrapper;
