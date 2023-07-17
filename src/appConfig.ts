import Config from 'react-native-config';

type Environment = 'development' | 'production' | 'staging';

type AppConfig = {
  APP_BUILD: string | undefined;
  APP_VERSION: string | undefined;
  CODEPUSH_ENABLED: boolean;
  ENVIRONMENT: Environment | undefined;
  REACTOTRON_ENABLED: boolean;
  SENTRY_ENABLED: boolean;
  SENTRY_DSN: string | undefined;
  STORAGE_TYPE: 'AsyncStorage' | 'MMKV';
};

const appConfig: AppConfig = {
  APP_BUILD: Config.APP_BUILD,
  APP_VERSION: Config.APP_VERSION,
  CODEPUSH_ENABLED: Config.CODEPUSH_ENABLED === 'true',
  ENVIRONMENT: Config.ENVIRONMENT as Environment,
  REACTOTRON_ENABLED: Config.REACTOTRON_ENABLED === 'true' && __DEV__,
  SENTRY_ENABLED: Config.SENTRY_ENABLED === 'TRUE',
  SENTRY_DSN: Config.SENTRY_DSN,
  STORAGE_TYPE: __DEV__ ? 'AsyncStorage' : 'MMKV',
};

export default appConfig;
