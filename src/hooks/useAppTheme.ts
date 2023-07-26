import { StatusBarStyle, useColorScheme } from 'react-native';
import { DefaultTheme as NavigationDefaultTheme } from '@react-navigation/native';
import { MD3DarkTheme, MD3LightTheme } from 'react-native-paper';

import { useAppSelector } from './useRedux';
import { selectThemeId } from '../store/selectors';
import { theme as themes } from '../theme';

const useAppTheme = () => {
  const systemThemeId = useColorScheme() ?? 'light';
  const themeId = useAppSelector(selectThemeId);
  const appThemeId = themeId === 'system' ? systemThemeId : themeId;
  const isDark = appThemeId === 'dark';
  const barStyle: StatusBarStyle = 'light-content';
  const appTheme = themes[appThemeId];
  const defaultPaperTheme = isDark ? MD3DarkTheme : MD3LightTheme;
  const paperTheme = {
    ...defaultPaperTheme,
    colors: appTheme.colors,
  };
  const { colors } = appTheme;

  const navTheme = {
    ...NavigationDefaultTheme,
    colors: {
      primary: colors.primary,
      background: colors.background,
      card: colors.surface,
      text: colors.onPrimary,
      border: colors.onPrimary,
      notification: colors.error,
    },
  };

  return {
    appTheme,
    barStyle,
    navTheme,
    paperTheme,
  };
};

export { useAppTheme };

/*
// TODO: consider this for better control over themeing.  It changes all of the code completion.
import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native';
import {
  adaptNavigationTheme,
  MD3DarkTheme,
  MD3LightTheme,
} from 'react-native-paper';

const useAppTheme = () => {
  const { LightTheme, DarkTheme } = adaptNavigationTheme({
    reactNavigationLight: NavigationDefaultTheme,
    reactNavigationDark: NavigationDarkTheme,
  });

  const navTheme = isDark ? DarkTheme : LightTheme;
};
*/
