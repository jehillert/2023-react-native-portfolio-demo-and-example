import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { DirectoryScreen, NoteScreen } from '../screens';
import { Screens } from './types';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { useTheme } from 'styled-components/native';

import { selectLeftDrawerOpen } from '../store/selectors';
import { useAppDispatch, useAppSelector } from '../hooks/useRedux';
import { IconPressable, Text } from '../components';
import { config as linkingConfig } from '../linking';
import { RootNavigation } from '.';
import {
  useInitialURL,
  useLinking,
  useMessagingSubscribe,
  useNotificationsPermission,
} from '../hooks';
import { leftDrawerOpened } from '../store/slices';

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
  const dispatch = useAppDispatch();
  const leftDrawerOpen = useAppSelector(selectLeftDrawerOpen);

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
  const menuPressable = () => {
    const handlePressMenu = () => {
      dispatch(leftDrawerOpened(!leftDrawerOpen));
    };
    return <IconPressable name="menu" onPress={handlePressMenu} />;
  };

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
            headerLeft: menuPressable,
          }}
        />
        <Stack.Screen name={Screens.NOTE} component={NoteScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigator;
