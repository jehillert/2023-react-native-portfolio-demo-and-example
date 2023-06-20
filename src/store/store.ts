import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './root-reducer';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['notes', 'settings'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware({ serializableCheck: false }),
  devTools: process.env.NODE_ENV !== 'production',
});

if (process.env.NODE_ENV === 'development' && (module as any).hot) {
  (module as any).hot.accept(() => {
    const newRootReducer = require('./root-reducer').default;
    store.replaceReducer(newRootReducer);
  });
}

let persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export { persistor, store };
