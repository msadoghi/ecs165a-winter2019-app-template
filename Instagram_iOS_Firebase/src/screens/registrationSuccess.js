
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { getUser } from '../services/userService';
import { withNavigation } from 'react-navigation';
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#B6A6BB',
    },
    itemtext: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
    }
})

class ListUser extends Component {
    constructor(props) {

        super(props);
        this.state = {
            username: ''
        }


    }
    componentDidMount() {
        const id = this.props.navigation.getParam('email')
      //  console.log(id)
        let firstname;
        let data = getUser(id)
        data.once('value', (snapshot) => {
            snapshot.forEach(function (childSnapshot) {
                firstname = childSnapshot.val().firstName;
            });
            this.setState({ username: firstname });
            // console.log(firstname)
        })
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.itemtext}>Hello {this.state.username}</Text>
            </View>
        )
    }
}
export default withNavigation(ListUser);