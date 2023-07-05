import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { DirectoryScreen, NoteScreen } from '../screens';
import { ScreensEnum } from './types';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { useTheme } from 'styled-components/native';

import { IconPressable, Text } from '../components';
import { config as linkingConfig } from '../linking';
import DrawerPressable from './DrawerPressable';
import navigationRef from './root-navigation';
import {
  useInitialURL,
  useLinking,
  useMessagingSubscribe,
  useNotificationsPermission,
} from '../hooks';

type DrawerProps = { drawerId: 'left' | 'right' };

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
          primary: colors.primaryMain,
          background: colors.backgroundDefault,
          card: colors.backgroundPaper,
          text: colors.textPrimary,
          border: colors.textPrimary,
          notification: colors.errorMain,
        },
      }
    : DefaultTheme;

  const backPressable = () => <IconPressable name="chevron-left" />;

  const directoryMenuButton = () => <DrawerPressable drawerId="left" />;

  const noteScreenMenuButton = () => <DrawerPressable drawerId="right" />;

  return (
    <NavigationContainer
      linking={linking}
      fallback={<Text.H6>Loading...</Text.H6>}
      ref={navigationRef}
      theme={navTheme}>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: 'tomato' },
          headerLeft: backPressable,
        }}>
        <Stack.Screen
          name={ScreensEnum.DIRECTORY}
          component={DirectoryScreen}
          options={{
            title: 'Notes',
            headerTitleAlign: 'center',
            headerRight: directoryMenuButton,
            headerLeft: undefined,
          }}
        />
        <Stack.Screen
          name={ScreensEnum.NOTE}
          component={NoteScreen}
          options={{
            headerRight: noteScreenMenuButton,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigator;
