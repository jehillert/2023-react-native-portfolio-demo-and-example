import React, { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { store, persistor } from './store/store';
import { Sentry } from './integrations';

type Props = {
  children: ReactNode;
};

const AppWrapper = ({ children }: Props) => {
  return (
    <Sentry.TouchEventBoundary>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <GestureHandlerRootView style={{ flex: 1 }}>
            {children}
          </GestureHandlerRootView>
        </PersistGate>
      </Provider>
    </Sentry.TouchEventBoundary>
  );
};

export default AppWrapper;
