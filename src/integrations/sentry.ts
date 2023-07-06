import * as Sentry from '@sentry/react-native';

const initSentry = () =>
  Sentry.init({
    dsn: 'https://94000ddedfa648febc04ff85a10e66f8@o4505481554362368.ingest.sentry.io/4505481556197376',
    tracesSampleRate: 1.0,
  });

export { initSentry, Sentry };
