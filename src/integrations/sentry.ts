import * as Sentry from '@sentry/react-native';
import appConfig from '../appConfig';

const { APP_BUILD, APP_VERSION, SENTRY_ENABLED } = appConfig;

const initSentry = () =>
  SENTRY_ENABLED &&
  Sentry.init({
    dsn: 'https://94000ddedfa648febc04ff85a10e66f8@o4505481554362368.ingest.sentry.io/4505481556197376',
    attachScreenshot: true,
    tracesSampleRate: 1.0,
    release: APP_VERSION,
    dist: APP_BUILD,
  });

export { initSentry, Sentry };
