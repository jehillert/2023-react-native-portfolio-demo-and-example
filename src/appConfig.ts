import Config from 'react-native-config';

type AppConfig = Record<string, string | boolean | undefined>;

const STORAGE_TYPE: 'AsyncStorage' | 'MMKV' = 'AsyncStorage';
const REACTOTRON_ENABLED = true;

const appConfig: AppConfig = {
  STORAGE_TYPE,
  REACTOTRON_ENABLED: REACTOTRON_ENABLED && __DEV__,
};

export default appConfig;
