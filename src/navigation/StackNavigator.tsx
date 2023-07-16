import React from 'react';
import { View } from 'react-native';
import { styled, useTheme } from 'styled-components/native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { RootStackParamList, ScreensEnum } from './types';
import {
  DirectoryScreen,
  MarkupScreen,
  NoteScreen,
  PrivacyPolicyScreen,
  TermsOfServiceScreen,
} from '../screens';
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
  const navTheme = useCustomNavTheme();
  const { colors } = useTheme();

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
      fallback={<Text.H6>Loading...</Text.H6>}
      ref={navigationRef}
      theme={navTheme}>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: colors.primaryMain },
          headerLeft: backButton,
          presentation: 'card',
          headerTitleAlign: 'center',
        }}>
        <Stack.Group>
          <Stack.Screen
            name={ScreensEnum.DIRECTORY}
            component={DirectoryScreen}
            options={{
              title: 'Documents',
              headerLeft: settingsDrawerButton,
              headerRight: undefined,
              animation: 'slide_from_right',
            }}
          />
          <Stack.Screen
            name={ScreensEnum.NOTE}
            component={NoteScreen}
            options={{
              title: 'Edit',
              headerRight: markupScreenDrawerButtons,
              animation: 'slide_from_right',
            }}
          />
          <Stack.Screen
            name={ScreensEnum.MARKUP}
            component={MarkupScreen}
            options={{
              title: 'Markup',
              headerRight: markupScreenDrawerButtons,
              animation: 'slide_from_right',
            }}
          />
        </Stack.Group>
        <Stack.Group>
          <Stack.Screen
            name={ScreensEnum.PRIVACY_POLICY}
            component={PrivacyPolicyScreen}
            options={{
              title: 'Privacy Policy',
            }}
          />
          <Stack.Screen
            name={ScreensEnum.TERMS_OF_SERVICE}
            component={TermsOfServiceScreen}
            options={{
              title: 'Terms of Service',
            }}
          />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigator;
