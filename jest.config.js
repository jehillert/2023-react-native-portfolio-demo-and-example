/** @type {import('jest').Config} */
const config = {
  preset: 'react-native',
  setupFilesAfterEnv: [
    '<rootDir>/setup-jest.js',
    './__mocks__/react-native-firebase-messaging.js',
  ],
  verbose: true,
};

module.exports = config;
