const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');
const path = require('path');

const projectRoot = __dirname;
const libp2pPath = path.resolve(
  __dirname,
  '/Users/horizon/Desktop/work/js-libp2p/packages/libp2p',
);

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
      modules: libp2pPath,
    },
    nodeModulesPaths: [
      path.resolve(projectRoot, 'node_modules'),
      path.resolve(libp2pPath, 'node_modules'),
    ],
  },
  watchFolders: [libp2pPath],
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
