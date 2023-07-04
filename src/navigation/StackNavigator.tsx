import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { DirectoryScreen, NoteScreen } from '../screens';
import { Screens } from './types';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { useTheme } from 'styled-components/native';

import { IconPressable, Text } from '../components';
import { config as linkingConfig } from '../linking';
import { RootNavigation } from '.';
import {
  useInitialURL,
  useLinking,
  useMessagingSubscribe,
  useNotificationsPermission,
} from '../hooks';

const linking = {
  prefixes: ['https://hillert.dev', 'jnotes://'],
  config: linkingConfig,
};

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  useNotificationsPermission();
  useMessagingSubscribe();
  // not gonna work until you add android assetLinks.json (https://medium.com/@ertemishakk/deep-linking-with-react-native-c7fbaac25127)
  useLinking();
  // not gonna work until you add android assetLinks.json (https://medium.com/@ertemishakk/deep-linking-with-react-native-c7fbaac25127)
  useInitialURL();

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

  const backPressable = () => <IconPressable name="chevron-left" />;

  return (
    <NavigationContainer
      linking={linking}
      fallback={<Text.H6>Loading...</Text.H6>}
      ref={RootNavigation.navigationRef}
      theme={navTheme}>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: 'tomato' },
          headerLeft: backPressable,
        }}>
        <Stack.Screen
          name={Screens.DIRECTORY}
          component={DirectoryScreen}
          options={{
            title: 'Notes',
            headerTitleAlign: 'center',
          }}
        />
        <Stack.Screen name={Screens.NOTE} component={NoteScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigator;
