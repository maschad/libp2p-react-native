/**
 * @format
 */

global.Buffer = require('buffer').Buffer;
global.process = require('process');

import 'react-native-get-random-values';
import 'react-native-quick-crypto';
import 'react-native-url-polyfill/auto';
import '@react-native/js-polyfills';
import 'event-target-polyfill';
import 'fast-text-encoding';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
