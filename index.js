/**
 * @format
 */

import { AppRegistry } from 'react-native';
import { name as appName } from './app.json';
import App from './src/Router';
import './src/core/i18n/i18n.config';

AppRegistry.registerComponent(appName, () => App);
