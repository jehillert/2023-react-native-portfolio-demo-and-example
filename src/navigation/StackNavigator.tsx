import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { DirectoryScreen, NoteScreen } from '../comp.screens';
import { Screens } from './types';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { useTheme } from 'styled-components/native';

import { RootNavigation } from '.';
import { Text } from '../comp.common';
import { config as linkingConfig } from '../linking';
import { useMessagingSubscribe, useNotificationsPermission } from '../hooks';

const linking = {
  prefixes: ['https://hillert.dev', 'jnotes://'],
  config: linkingConfig,
};

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  useNotificationsPermission();
  useMessagingSubscribe();
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
      <Stack.Navigator
        screenOptions={{ headerStyle: { backgroundColor: 'tomato' } }}>
        <Stack.Screen name={Screens.DIRECTORY} component={DirectoryScreen} />
        <Stack.Screen
          name={Screens.NOTE}
          component={NoteScreen}
          options={({ route }) => ({ title: 'Notes' })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigator;
