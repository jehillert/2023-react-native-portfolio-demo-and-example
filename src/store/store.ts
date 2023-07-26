// NOTE - MMKV Store Shareable b/n Apps: https://github.com/mrousavy/react-native-mmkv#app-groups.
// NOTE - MMKV Encryptable: But remember to change answers about encryption ion ios/google play
import { AnyAction, StoreEnhancer } from 'redux';
import { MMKV } from 'react-native-mmkv';
import { ThunkAction, configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer, Storage } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Reactotron from '../../ReactotronConfig';
import rootReducer from './root-reducer';
import appConfig from '../appConfig';

const { REACTOTRON_ENABLED, STORAGE_TYPE } = appConfig;

let storage: Storage;

if (STORAGE_TYPE === 'MMKV') {
  const mmkv = new MMKV();

  storage = {
    setItem: (key, value) => {
      mmkv.set(key, value);
      return Promise.resolve(true);
    },
    getItem: key => {
      const value = mmkv.getString(key);
      return Promise.resolve(value);
    },
    removeItem: key => {
      mmkv.delete(key);
      return Promise.resolve();
    },
  };
} else {
  storage = AsyncStorage;
}

const getEnhancers = () => {
  let enhancers: StoreEnhancer[] = [];

  REACTOTRON_ENABLED &&
    Reactotron?.createEnhancer &&
    enhancers.push(Reactotron?.createEnhancer());

  return enhancers;
};

const persistConfig = {
  key: 'root',
  // whitelist: ['notes', 'settings'],
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({ serializableCheck: false }),
  devTools: __DEV__,
  enhancers: getEnhancers(),
});

if (__DEV__ && (module as any).hot) {
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
