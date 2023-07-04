import { AnyAction } from 'redux';
import { MMKV } from 'react-native-mmkv';
import { ThunkAction, configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer, Storage } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Reactotron from '../../ReactotronConfig';
import rootReducer from './root-reducer';
import appConfig from '../appConfig';

const { REACTRON_ENABLED, STORAGE_TYPE } = appConfig;

// NOTE: MMKV enables data sharing between your apps. https://github.com/mrousavy/react-native-mmkv#app-groups.
// NOTE: data can be encrypted. but remember to change answers about encryption ion ios/google play
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

const persistConfig = {
  key: 'root',
  // whitelist: ['notes', 'settings'],
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

let enhancers =
  REACTRON_ENABLED && Reactotron?.createEnhancer
    ? [Reactotron?.createEnhancer()]
    : [];

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({ serializableCheck: false }),
  devTools: __DEV__,
  enhancers,
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
