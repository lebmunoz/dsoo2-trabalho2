import React from 'react';
// import { LogBox } from 'react-native';
import Routes from './src/Routes'

import {useTranslation} from "react-i18next";

import './src/locales'
import {Text} from "react-native-web";
import {TouchableOpacity} from "react-native";

// LogBox.ignoreWarnings([
//   'Unrecognized WebSocket'
// ]);

export default function App() {

  return (<Routes />);
}