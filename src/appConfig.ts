import Config from 'react-native-config';

type Environment = 'development' | 'production' | 'staging';

type AppConfig = {
  APP_BUILD: string | undefined;
  APP_VERSION: string | undefined;
  CODEPUSH_ENABLED: boolean;
  ENVIRONMENT: Environment | undefined;
  REACTOTRON_ENABLED: boolean;
  STORAGE_TYPE: 'AsyncStorage' | 'MMKV';
};

const appConfig: AppConfig = {
  APP_BUILD: Config.APP_BUILD,
  APP_VERSION: Config.APP_VERSION,
  CODEPUSH_ENABLED: Config.CODEPUSH_ENABLED === 'true',
  ENVIRONMENT: Config.ENVIRONMENT as Environment,
  REACTOTRON_ENABLED: Config.REACTOTRON_ENABLED === 'true' && __DEV__,
  STORAGE_TYPE: __DEV__ ? 'AsyncStorage' : 'MMKV',
};

export default appConfig;
