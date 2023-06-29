module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    '@babel/plugin-transform-export-namespace-from',
    'babel-plugin-styled-components',
    'react-native-reanimated/plugin',
  ],
};
