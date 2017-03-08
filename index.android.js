import { AppRegistry } from 'react-native';
import codePush from "react-native-code-push";
import App from './App';

let codePushOptions = { checkFrequency: codePush.CheckFrequency.MANUAL };

AppRegistry.registerComponent('geekSets', () => codePush(codePushOptions)(App));
