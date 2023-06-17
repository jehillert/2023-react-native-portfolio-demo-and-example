/** @type {import('jest').Config} */
const config = {
  preset: 'react-native',
  setupFilesAfterEnv: [
    '<rootDir>/setup-jest.js',
    './__mocks__/react-native-firebase-messaging-mock.js',
    './__mocks__/react-navigation-mock.js',
    './__mocks__/react-native-webview-mock.js',
  ],
  setupFiles: ['./__mocks__/react-native-permissions-mock.js'],
  transformIgnorePatterns: [
    'node_modules/(?!(jest-)?react-native|@react-native-community|@react-navigation|@react-native)',
  ],
  verbose: true,
};

module.exports = config;
