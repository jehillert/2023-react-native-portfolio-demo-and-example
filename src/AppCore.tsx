import 'react-native-gesture-handler';

import React from 'react';
import { MD3DarkTheme, MD3LightTheme, PaperProvider } from 'react-native-paper';
import { ThemeProvider } from 'styled-components/native';
import { StatusBar, useColorScheme } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';

import { useAppSelector } from './hooks/useRedux';
import { StackNavigator } from './navigation';
import { selectThemeId } from './store/selectors';
import { theme } from './theme';

let AppCore = () => {
  const systemThemeId = useColorScheme() ?? 'light';
  const themeId = useAppSelector(selectThemeId);
  const appThemeId = themeId === 'system' ? systemThemeId : themeId;
  const isDark = appThemeId === 'dark';
  const barStyle = isDark ? 'light-content' : 'dark-content';
  const backgroundColor = isDark ? Colors.darker : Colors.lighter;

  return (
    <ThemeProvider theme={theme[appThemeId]}>
      <PaperProvider theme={isDark ? MD3DarkTheme : MD3LightTheme}>
        <StatusBar barStyle={barStyle} backgroundColor={backgroundColor} />
        <StackNavigator />
      </PaperProvider>
    </ThemeProvider>
  );
};

export default AppCore;
