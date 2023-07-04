import { MMKV } from 'react-native-mmkv';
import { Storage } from 'redux-persist';
import AsyncStorage, {
  AsyncStorageStatic,
} from '@react-native-async-storage/async-storage';

let storage: MMKV | AsyncStorageStatic;

// NOTE: MMKV enables data sharing between your apps. https://github.com/mrousavy/react-native-mmkv#app-groups.
// NOTE: data can be encrypted. but remember to change answers about encryption ion ios/google play
if (!__DEV__) {
  storage = new MMKV();

  const MMKVStorage: Storage = {
    setItem: (key, value) => {
      (storage as MMKV).set(key, value);
      return Promise.resolve(true);
    },
    getItem: key => {
      const value = (storage as MMKV).getString(key);
      return Promise.resolve(value);
    },
    removeItem: key => {
      (storage as MMKV).delete(key);
      return Promise.resolve();
    },
  };
} else {
  storage = AsyncStorage;
}
