import 'react-native-gesture-handler';

import React from 'react';
import codePush from 'react-native-code-push';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import { LogBox } from 'react-native';

import AppCore from './AppCore';
import { initSentry, Sentry } from './integrations;';
import { codePushOptions, useCodePush } from './hooks';
import { store, persistor } from './store/store';

LogBox.ignoreAllLogs();

initSentry();

let App = () => {
  useCodePush();

  return (
    <Sentry.TouchEventBoundary>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <GestureHandlerRootView style={{ flex: 1 }}>
            <SafeAreaProvider>
              <AppCore />
            </SafeAreaProvider>
          </GestureHandlerRootView>
        </PersistGate>
      </Provider>
    </Sentry.TouchEventBoundary>
  );
};

App = codePush(codePushOptions)(App);

export default App;
