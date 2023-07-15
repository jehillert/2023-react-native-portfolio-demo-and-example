import 'react-native-gesture-handler';
import React from 'react';
import codePush from 'react-native-code-push';
import { LogBox } from 'react-native';

import { codePushOptions, useCodePush } from './hooks';
import AppCore from './AppCore';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './store/store';
import { useShare } from './hooks';
import { SafeAreaProvider } from 'react-native-safe-area-context';

LogBox.ignoreAllLogs();

let App = () => {
  useCodePush();
  useShare();

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <SafeAreaProvider>
            <AppCore />
          </SafeAreaProvider>
        </GestureHandlerRootView>
      </PersistGate>
    </Provider>
  );
};

App = codePush(codePushOptions)(App);

export default App;
