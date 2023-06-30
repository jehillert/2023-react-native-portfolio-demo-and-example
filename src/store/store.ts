import { AnyAction } from 'redux';
import { MMKV } from 'react-native-mmkv';
import { ThunkAction, configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer, Storage } from 'redux-persist';
import rootReducer from './root-reducer';
import Reactotron from '../../ReactotronConfig';

// NOTE: can share data between your apps. https://github.com/mrousavy/react-native-mmkv#app-groups.
// NOTE: data can be encrypted. but remember to change answers about encryption ion ios/google play
const storage = new MMKV();

export const reduxStorage: Storage = {
  setItem: (key, value) => {
    storage.set(key, value);
    return Promise.resolve(true);
  },
  getItem: key => {
    const value = storage.getString(key);
    return Promise.resolve(value);
  },
  removeItem: key => {
    storage.delete(key);
    return Promise.resolve();
  },
};

const persistConfig = {
  key: 'root',
  storage: reduxStorage,
  whitelist: ['notes', 'settings'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

let enhancers = Reactotron?.createEnhancer
  ? [Reactotron?.createEnhancer()]
  : [];

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({ serializableCheck: false }),
  devTools: process.env.NODE_ENV !== 'production',
  enhancers,
});

if (process.env.NODE_ENV === 'development' && (module as any).hot) {
  (module as any).hot.accept(() => {
    const newRootReducer = require('./root-reducer').default;
    store.replaceReducer(newRootReducer);
  });
}

let persistor = persistStore(store);

type AppDispatch = typeof store.dispatch;

type RootState = ReturnType<typeof store.getState>;

type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  AnyAction
>;

type AsyncAppThunkWReturn<SomeReturnType> = AppThunk<Promise<SomeReturnType>>;

export type { AppDispatch, RootState, AppThunk, AsyncAppThunkWReturn };
export { persistor, storage, store };
