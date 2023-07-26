import React from 'react';

import { View } from 'react-native';

import { styled, useTheme } from 'styled-components/native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { DrawerId } from '../store/slices';
import { ScreenEnum } from '../constants';
import { RootStackParamList } from './types';
import navigationRef from './root-navigation';
import { DrawerToggle, TextPaper } from '../components';
import { useLinking, useInitialURL } from '../linking';
import TitledBackButton from './nav-buttons/TitledBackButton';
import {
  useAppTheme,
  useMessagingSubscribe,
  useNotificationsPermission,
} from '../hooks';
import {
  EditorScreen,
  MarkupScreen,
  DirectoryScreen,
  PrivacyPolicyScreen,
  TermsOfServiceScreen,
} from '../screens';

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
  const { navTheme } = useAppTheme();
  const { colors } = useTheme();

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
      fallback={<TextPaper.TitleMedium>Loading...</TextPaper.TitleMedium>}
      ref={navigationRef}
      theme={navTheme}>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: colors.primaryContainer },
          contentStyle: { backgroundColor: colors.background },
          presentation: 'card',
        }}>
        <Stack.Group>
          <Stack.Screen
            name={ScreenEnum.DIRECTORY}
            component={DirectoryScreen}
            options={{
              title: 'Inquiries',
              headerLeft: settingsDrawerButton,
              headerRight: undefined,
              animation: 'slide_from_right',
              headerTitleAlign: 'center',
            }}
          />
          <Stack.Screen
            name={ScreenEnum.EDITOR}
            component={EditorScreen}
            options={{
              headerLeft: TitledBackButton,
              headerRight: markupScreenDrawerButtons,
              headerBackVisible: false,
              animation: 'slide_from_right',
              title: '',
            }}
          />
          <Stack.Screen
            name={ScreenEnum.MARKUP}
            component={MarkupScreen}
            options={{
              headerLeft: TitledBackButton,
              headerRight: markupScreenDrawerButtons,
              headerBackVisible: false,
              animation: 'slide_from_right',
              title: '',
            }}
          />
        </Stack.Group>
        <Stack.Group>
          <Stack.Screen
            name={ScreenEnum.PRIVACY_POLICY}
            component={PrivacyPolicyScreen}
            options={{
              title: 'Privacy Policy',
            }}
          />
          <Stack.Screen
            name={ScreenEnum.TERMS_OF_SERVICE}
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
