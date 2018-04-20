'use-strict';

import React, { Component } from 'react';
import {
    Text,
    View,
    StyleSheet,
    TextInput
 } from 'react-native';
 import Button from './common/Button';

export default class ContactForm extends Component {

    onNameChange = (text) => {
        // debugger;
        this.props.setNameText(text);
        // console.log(this.props.nameText);
    };

    onEmailChange = (text) => {
        this.props.setEmailText(text);
        // console.log(this.props.emailText);
    }

    onMessageChange = (text) => {
        this.props.setMessageText(text);
        // console.log(this.props.messageText);
    }
    submitInfo = () => {
        console.log('submitInfo pressed');
        const { nameText, emailText, messageText } = this.props;
        const info = {
            name: nameText,
            email: emailText,
            message: messageText
        };
        this.props.sendContactInfo(info);
        console.log(this.props.contactInfo);
    }
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
                onChangeText={this.onEmailChange}
            />
            <Text style={styles.textStyle}>Message</Text>
            <TextInput
                style={StyleSheet.flatten([styles.inputStyle, styles.messageInput])}
                placeholder=' Enter Message Here'
                onChangeText={this.onMessageChange}
                multiline
            />
            <View style={styles.buttonContainer}>
                <Button
                    onPress={this.submitInfo}
                >
                    Submit
                </Button>
            </View>
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
    },
    buttonContainer: {
        flex: 1,
        alignItems: 'flex-end',
        // borderWidth: 1,
        // borderColor: 'black',
        flexDirection: 'row'
    }
});
