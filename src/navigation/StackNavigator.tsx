import React from 'react';
import { View } from 'react-native';
import { styled } from 'styled-components/native';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList, ScreensEnum } from './types';
import { DirectoryScreen, MarkupScreen, NoteScreen } from '../screens';
import { useTheme } from 'styled-components/native';

import navigationRef from './root-navigation';
import DrawerToggle from '../components/drawer/DrawerToggle';
import { DrawerId } from '../store/slices';
import { IconPressable, Text } from '../components';
import { useLinking, useInitialURL } from '../linking';
import {
  useCustomNavTheme,
  useMessagingSubscribe,
  useNotificationsPermission,
} from '../hooks';

const DrawerButtonGroupContainer = styled(View)`
  flex-direction: row;
  flex-wrap: nowrap;
  gap: 12px;
`;

const Stack = createNativeStackNavigator<RootStackParamList>();

const StackNavigator = () => {
  useNotificationsPermission();
  useMessagingSubscribe();
  useLinking();
  useInitialURL();
  const theme = useTheme();
  const colors = theme?.colors;
  const navTheme = useCustomNavTheme();

  const backButton = () => <IconPressable name="chevron-left" />;

  const settingsDrawerButton = () => (
    <DrawerToggle drawerId={DrawerId.APP_SETTINGS} name="menu" />
  );

  const markupScreenDrawerButtons = () => (
    <DrawerButtonGroupContainer>
      <DrawerToggle drawerId={DrawerId.MARKUP_TOOLS} name="dock-left" />
      <DrawerToggle drawerId={DrawerId.DOCUMENT_MAP} name="dock-right" />
    </DrawerButtonGroupContainer>
  );

  return (
    <NavigationContainer
      // linking={linking}
      fallback={<Text.H6>Loading...</Text.H6>}
      ref={navigationRef}
      theme={navTheme}>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: 'tomato' },
          headerLeft: backButton,
          presentation: 'card',
        }}>
        <Stack.Screen
          name={ScreensEnum.DIRECTORY}
          component={DirectoryScreen}
          options={{
            title: 'Notes',
            headerTitleAlign: 'center',
            headerRight: settingsDrawerButton,
            headerLeft: undefined,
            animation: 'slide_from_right',
          }}
        />
        <Stack.Screen
          name={ScreensEnum.NOTE}
          component={NoteScreen}
          options={{
            title: 'Notes',
            headerTitleAlign: 'center',
            headerRight: markupScreenDrawerButtons,
            animation: 'slide_from_right',
          }}
        />
        <Stack.Screen
          name={ScreensEnum.MARKUP}
          component={MarkupScreen}
          options={{
            title: 'Notes',
            headerTitleAlign: 'center',
            headerRight: markupScreenDrawerButtons,
            animation: 'slide_from_right',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigator;
