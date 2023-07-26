import 'react-native-gesture-handler';

import React from 'react';
import { PaperProvider } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ThemeProvider } from 'styled-components/native';
import { StatusBar } from 'react-native';
import { styled } from 'styled-components/native';

import {
  Drawer,
  AppSettingsDrawerContent,
  DocumentMapDrawerContent,
  MarkupDrawerContent,
} from './components';
import { StackNavigator } from './navigation';
import { DrawerId } from './store/slices';
import { useAppTheme, useShare } from './hooks';

const AppSafeArea = styled(SafeAreaView)`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`;

let AppCore = () => {
  useShare();
  const { appTheme, barStyle, paperTheme } = useAppTheme();

  return (
    <ThemeProvider theme={appTheme}>
      <PaperProvider theme={paperTheme}>
        <AppSafeArea>
          <StatusBar barStyle={barStyle} />
          <Drawer
            drawerId={DrawerId.MARKUP_TOOLS}
            drawerPosition="left"
            renderDrawerContent={() => (
              <MarkupDrawerContent drawerId={DrawerId.MARKUP_TOOLS} />
            )}>
            <Drawer
              drawerId={DrawerId.DOCUMENT_MAP}
              drawerPosition="right"
              renderDrawerContent={() => (
                <DocumentMapDrawerContent drawerId={DrawerId.DOCUMENT_MAP} />
              )}>
              <Drawer
                drawerId={DrawerId.APP_SETTINGS}
                drawerPosition="left"
                renderDrawerContent={() => (
                  <AppSettingsDrawerContent drawerId={DrawerId.APP_SETTINGS} />
                )}>
                <StackNavigator />
              </Drawer>
            </Drawer>
          </Drawer>
        </AppSafeArea>
      </PaperProvider>
    </ThemeProvider>
  );
};

export default AppCore;
