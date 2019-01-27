import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Navigator,
  Text,
  View
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import AddUser from './src/screens/registerUser';
import ListUser from './src/screens/registrationSuccess';
import { YellowBox } from 'react-native';

YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);

export const AppNavigator = StackNavigator({
  
  AddSignupScreen: { screen: AddUser },
  ListUserScreen: { screen: ListUser }
});

export default class App extends Component {
  render() {
    return (
      <AppNavigator />
    );
  }
}