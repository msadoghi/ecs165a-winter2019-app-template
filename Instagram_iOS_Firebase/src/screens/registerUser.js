import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableHighlight,
  AlertIOS
} from 'react-native';
import { withNavigation } from 'react-navigation';

import { StackNavigator, TabNavigator } from 'react-navigation';
import { addUser } from '../services/userService';

class AddUser extends Component {
  constructor(props) {
      super(props);
      this.state = {
      firstName: 'your firstname',
      lastName: 'your lastname',
      email: 'user@gmail.com',
      password:'******',
      }
     
      this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    
    handleSubmit() {
      addUser(this.state);
      AlertIOS.alert(
        'Registered successfully'
       );
  
       this.props.navigation.push('ListUserScreen', {
        email: this.state.email,
      })
      
      
    }
    
      
    
  render() {
    return (
      <View style={styles.main}>
        <Text style={styles.title}>Signup</Text>
        <TextInput
              style={styles.itemInput}
              onChangeText={(firstName) => this.setState({firstName})}
              placeholder="Firstname"
              autoCapitalize = "none"
            />
            <TextInput
              style={styles.itemInput}
              onChangeText={(lastName) => this.setState({lastName})}
              placeholder="Lastname"
              autoCapitalize = "none"
            />
          
            <TextInput
              style={styles.itemInput}
              onChangeText={(email) => this.setState({email})}
              placeholder="user@gmail.com"
              autoCapitalize = "none"
            />
              <TextInput
              style={styles.itemInput}
              onChangeText={(password) => this.setState({password})}
              placeholder={this.state.password}
              autoCapitalize = "none"
            />
        <TouchableHighlight
                style = {styles.button}
                underlayColor= "white"
                onPress = {this.handleSubmit}
              >
              <Text
                  style={styles.buttonText}>
                  Signup
              </Text>
            </TouchableHighlight>
      </View>
    )
  }
}
export default  withNavigation(AddUser);
const styles = StyleSheet.create({
  main: {
    flex: 1,
    padding: 30,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: '#2a8ab7'
  },
  title: {
    marginBottom: 20,
    fontSize: 25,
    textAlign: 'center'
  },
  itemInput: {
    height: 50,
    padding: 4,
    marginRight: 5,
    fontSize: 23,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 8,
    color: 'white',
    marginBottom: 4
  },
  buttonText: {
    fontSize: 18,
    color: '#111',
    alignSelf: 'center'
  },
  button: {
    height: 45,
    flexDirection: 'row',
    backgroundColor:'white',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    marginTop: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  }
});