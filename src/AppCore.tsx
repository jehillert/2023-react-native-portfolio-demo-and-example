import 'react-native-gesture-handler';

import React from 'react';
import { MD3DarkTheme, MD3LightTheme, PaperProvider } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ThemeProvider } from 'styled-components/native';
import { StatusBar, useColorScheme } from 'react-native';
import { styled } from 'styled-components/native';

import {
  AppSettingsDrawerContent,
  BaseDrawer,
  DocumentMapDrawerContent,
  MarkupDrawerContent,
} from './components';
import { selectThemeId } from './store/selectors';
import { StackNavigator } from './navigation';
import { DrawerId } from './store/slices';
import { useAppSelector } from './hooks';
import { theme as themes } from './theme';

const AppSafeArea = styled(SafeAreaView)`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.backgroundDefault};
`;

let AppCore = () => {
  const systemThemeId = useColorScheme() ?? 'light';
  const themeId = useAppSelector(selectThemeId);
  const appThemeId = themeId === 'system' ? systemThemeId : themeId;
  const isDark = appThemeId === 'dark';
  const barStyle = isDark ? 'light-content' : 'dark-content';
  const theme = themes[appThemeId];

  return (
    <ThemeProvider theme={theme}>
      <PaperProvider theme={isDark ? MD3DarkTheme : MD3LightTheme}>
        <AppSafeArea>
          <StatusBar barStyle={barStyle} />
          <BaseDrawer
            drawerId={DrawerId.MARKUP_TOOLS}
            drawerPosition="left"
            renderDrawerContent={() => (
              <MarkupDrawerContent drawerId={DrawerId.APP_SETTINGS} />
            )}>
            <BaseDrawer
              drawerId={DrawerId.DOCUMENT_MAP}
              drawerPosition="right"
              renderDrawerContent={() => (
                <DocumentMapDrawerContent drawerId={DrawerId.APP_SETTINGS} />
              )}>
              <BaseDrawer
                drawerId={DrawerId.APP_SETTINGS}
                drawerPosition="left"
                renderDrawerContent={() => (
                  <AppSettingsDrawerContent drawerId={DrawerId.APP_SETTINGS} />
                )}>
                <StackNavigator />
              </BaseDrawer>
            </BaseDrawer>
          </BaseDrawer>
        </AppSafeArea>
      </PaperProvider>
    </ThemeProvider>
  );
};

export default AppCore;
