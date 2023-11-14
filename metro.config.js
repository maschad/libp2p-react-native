const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');
const path = require('path');

/**
 * Metro configuration
 * https://facebook.github.io/metro/docs/configuration
 *
 * @type {import('metro-config').MetroConfig}
 */
const config = {
  resolver: {
    unstable_enablePackageExports: true,
    extraNodeModules: {
      url: require.resolve('react-native-url-polyfill/auto'),
      assert: require.resolve('@react-native/js-polyfills'),
      crypto: require.resolve('react-native-quick-crypto'),
      buffer: require.resolve('buffer/'),
      path: require.resolve('path-browserify'),
      process: require.resolve('process/browser.js'),
      os: require.resolve('os-browserify/browser.js'),
    },
  },
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
