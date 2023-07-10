import 'react-native-gesture-handler';
import React from 'react';
import codePush from 'react-native-code-push';
import { LogBox } from 'react-native';

import { initSentry, Sentry } from './integrations';
import { codePushOptions, useCodePush } from './integrations/useCodePush';
import AppCore from './AppCore';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './store/store';
import { useGetShare } from './hooks';

LogBox.ignoreAllLogs();

initSentry();

let App = () => {
  useCodePush();
  useGetShare();

  return (
    <Sentry.TouchEventBoundary>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <GestureHandlerRootView style={{ flex: 1 }}>
            <AppCore />
          </GestureHandlerRootView>
        </PersistGate>
      </Provider>
    </Sentry.TouchEventBoundary>
  );
};

App = codePush(codePushOptions)(Sentry.wrap(App));

export default App;
