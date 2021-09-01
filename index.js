/**
 * @format
 */

// Import the polyfill before anything else (import order matters!):
import 'react-native-get-random-values';
import {AppRegistry} from 'react-native';
import App from './src/App.js';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
