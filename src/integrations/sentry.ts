import * as Sentry from '@sentry/react-native';
import appConfig from '../appConfig';

const initSentry = () =>
  appConfig?.SENTRY_ENABLED &&
  Sentry.init({
    dsn: !__DEV__ ? appConfig.SENTRY_DSN : undefined,
    attachScreenshot: true,
    tracesSampleRate: 1.0,
    release: appConfig?.APP_VERSION,
    debug: true,
    dist: appConfig?.APP_BUILD,
  });

export { initSentry, Sentry };
