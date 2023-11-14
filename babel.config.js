/* eslint-disable prettier/prettier */
module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [['@babel/plugin-transform-private-methods', {'loose': true}], [
     'module-resolver',
    {
       alias: {
       'crypto': 'react-native-quick-crypto',
       'stream': 'stream-browserify',
       'buffer': '@craftzdog/react-native-buffer',
      },
    },
  ]],
};
