import 'react-native-gesture-handler';

import React from 'react';
import { PaperProvider } from 'react-native-paper';
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
  const barStyle = appThemeId === 'dark' ? Colors.darker : Colors.lighter;

  return (
    <ThemeProvider theme={theme[appThemeId]}>
      <PaperProvider>
        <StatusBar barStyle={barStyle} backgroundColor={barStyle} />
        <StackNavigator />
      </PaperProvider>
    </ThemeProvider>
  );
};

export default AppCore;
