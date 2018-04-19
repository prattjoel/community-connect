'use-strict';

import React, { Component } from 'react';
import {
    Text,
    View,
    StyleSheet,
    TextInput
 } from 'react-native';

export default class ContactForm extends Component {

    onNameChange = (text) => {
        // debugger;
        this.props.setNameText(text);
        console.log(this.props.nameText);
    };
  render() {
    return (
        <View style={styles.containerStyle}>
            <Text style={styles.textStyle}>Name</Text>
            <TextInput
                style={styles.inputStyle}
                placeholder=' Enter Name Here'
                onChangeText={this.onNameChange}
            />
            <Text style={styles.textStyle}>Email</Text>
            <TextInput
                style={styles.inputStyle}
                placeholder=' Enter Email Here'
            />
            <Text style={styles.textStyle}>Message</Text>
            <TextInput
                style={StyleSheet.flatten([styles.inputStyle, styles.messageInput])}
                placeholder=' Enter Message Here'
                multiline
            />
        </View>
    );
  }
}
// const = () => {
//   return (
//
//   );
// };

const styles = StyleSheet.create({
    containerStyle: {
        flex: 1,
        backgroundColor: 'white',
        // justifyContent: 'center'
    },
    inputStyle: {
        height: 40,
        borderWidth: 0.5,
        borderRadius: 5,
        borderColor: 'gray',
        marginRight: 10,
        marginLeft: 10,
        marginTop: 5
    },
    messageInput: {
        height: 120
    },
    textStyle: {
        marginLeft: 15,
        marginTop: 10,
        fontWeight: 'bold'
    }
});
