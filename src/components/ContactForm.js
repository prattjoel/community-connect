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
        if (this.isValidForm()) {
            const { nameText, emailText, messageText } = this.props;
            const info = {
                name: nameText,
                email: emailText,
                message: messageText
            };
            this.props.sendContactInfo(info);
            console.log('conactInfo: ', this.props.contactInfo);
        }
    }

    isValidForm = () => {
        // debugger;
        const { nameText, emailText, messageText } = this.props;
        if (nameText !== '' && emailText !== '' && messageText !== '') {
            // this.props.setFormValid(true)
            return true;
        }
        return false;
    }
  render() {
    return (
        <View style={styles.containerStyle}>
            <Text style={styles.textStyle}>Name</Text>
            <TextInput
                style={styles.inputStyle}
                placeholder=' Enter Name Here'
                onChangeText={this.onNameChange}
                value={this.props.nameText}
            />
            <Text style={styles.textStyle}>Email</Text>
            <TextInput
                style={styles.inputStyle}
                placeholder=' Enter Email Here'
                onChangeText={this.onEmailChange}
                value={this.props.emailText}
            />
            <Text style={styles.textStyle}>Message</Text>
            <TextInput
                style={StyleSheet.flatten([styles.inputStyle, styles.messageInput])}
                placeholder=' Enter Message Here'
                onChangeText={this.onMessageChange}
                value={this.props.messageText}
                multiline
            />
            <View style={styles.buttonContainer}>
                <Button
                    onPress={this.submitInfo}
                    disabled={!this.isValidForm()}
                    // disabled
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
