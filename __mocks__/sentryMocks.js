jest.mock('@sentry/react-native', () => ({
  init: jest.fn(),
  ReactNavigationInstrumentation: jest.fn(),
  ReactNativeTracing: jest.fn(),
  createReduxEnhancer: () => jest.fn(),
}));
