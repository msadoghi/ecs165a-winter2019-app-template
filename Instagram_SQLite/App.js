/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button, TextInput} from 'react-native';
import {createStackNavigator, createAppContainer} from 'react-navigation';
import GenerateForm from 'react-native-form-builder';
import { openDatabase } from 'react-native-sqlite-storage';
var db = openDatabase({ name: 'users.db' });

class HomeScreen extends Component{
    render() {
    const handlePress = () => false;
    const {navigate} = this.props.navigation;
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>GT in the house!</Text>
        <Button block style={styles.button} onPress={() => navigate('Register')} title="Register" />
        <Button block style={styles.button} onPress={() => navigate('Login')} title="Login" />
      </View>
    );
  }
}

class ProfileScreen extends Component{
    render() {
      const handlePress = () => false
      const name = this.props.navigation.state.params.name
      return (
        <View style={styles.wrapper}>
          <Text> Hello {name}</Text>
        </View>
      )
    }
}

class LoginScreen extends Component{
    constructor(props) {
      super(props);
      this.state = {
        user_name: '',
        password: '',
        user_found: false,
      };
    }

    render() {
    const handlePress = () => {
      const { user_name } = this.state;
      const { password } = this.state;
      const { navigate } = this.props.navigation;
      db.transaction(function(tx) {
          tx.executeSql(
            'SELECT user_id from users WHERE user_name = ? AND password = ?', [user_name, password],
            (tx, results) => {
              console.log('Results, ' + results);
              if (results.rows.length > 0){
                console.log("user found, "+user_name);
                navigate('Profile', { name: user_name });
              }
            });
  })
};
    return (
      <View style={styles.wrapper}>
        <TextInput placeholder="Rockstar" onChangeText={user_name => this.setState({ user_name })}/>
        <TextInput placeholder="Enter a password" onChangeText={password => this.setState({ password })}/>
        <Button icon="md-checkmark" iconPlacement="right" onPress={handlePress} title="Login"/>
      </View>
    );
  }
}

class RegisterScreen extends Component{
  constructor(props) {
    super(props);
    this.state = {
      user_name: '',
      email: '',
      password: '',
    };
  }

  render() {
    const handlePress = () => {
      const { user_name } = this.state;
      const { email } = this.state;
      const { password } = this.state;
      db.transaction(function(tx) {
          tx.executeSql('DROP TABLE IF EXISTS users', []);
          tx.executeSql(
            'CREATE TABLE IF NOT EXISTS users(user_id INTEGER PRIMARY KEY AUTOINCREMENT, user_name VARCHAR(20), email VARCHAR(20), password VARCHAR(20))',
            []
          );
          tx.executeSql(
            'INSERT INTO users(user_name, email, password) VALUES (?,?,?)',
            [user_name, email,password],
            (tx, results) => {
              console.log('Results, ' + results.rowsAffected + user_name + email + password);
            });
  })
};
    return (
        <View>
            <TextInput placeholder="abc@gmail.com" onChangeText={email => this.setState({ email })} />
            <TextInput placeholder="Rockstar" onChangeText={user_name => this.setState({ user_name })}/>
            <TextInput placeholder="Enter a password" onChangeText={password => this.setState({ password })}/>
            <Button icon="md-checkmark" iconPlacement="right" onPress={handlePress} title="Register"/>
        </View>
    );
  }
}

const styles = StyleSheet.create({
wrapper: {
    flex: 1,
    marginTop: 150,
  },
submitButton: {
    paddingHorizontal: 10,
    paddingTop: 20,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  button: {
    backgroundColor: 'blue',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 12,
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    overflow: 'hidden',
    padding: 12,
    textAlign:'center',
  },
});
const RootStack = createStackNavigator(
  {
    Home: HomeScreen,
    Login: LoginScreen,
    Register: RegisterScreen,
    Profile: ProfileScreen,
  },
  {
    initialRouteName: 'Home',
  }
);

const AppContainer = createAppContainer(RootStack);
type Props = {};
export default class App extends Component<Props> {
  render() {
    const handlePress = () => false
    return <AppContainer />;
  }
}
