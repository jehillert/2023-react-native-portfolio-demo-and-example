/** @type {import('jest').Config} */
const config = {
  preset: 'react-native',
  setupFilesAfterEnv: [
    '<rootDir>/setup-jest.js',
    './__mocks__/react-navigation-mocks.js',
  ],
  transformIgnorePatterns: [
    'node_modules/(?!(jest-)?react-native|@react-native-community|@react-navigation|@react-native)',
  ],
  verbose: true,
};

module.exports = config;
