'use-strict';

import React, { Component } from 'react';
import {
    Text,
    View,
    // StyleSheet,
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
        if (nameText.replace(/\s/g, '').length && emailText.replace(/\s/g, '').length && messageText.replace(/\s/g, '').length) {
            // this.props.setFormValid(true)
            return true;
        }
        return false;
    }

    showSentMessage = () => {
        if (this.props.contactInfoSent) {
            return (
                <View style={styles.sentContainer}>
                    <Text>
                        Message Sent
                    </Text>
                </View>
            );
        }
    }
  render() {
    const currentButtonStyle = this.isValidForm() ? styles.activeButton : styles.disabledButtonStyle;
    return (
        <View style={styles.containerStyle}>
            <Text style={styles.textStyle}>Name</Text>
            <TextInput
                style={styles.inputStyle}
                placeholder=' Enter Your Name Here'
                onChangeText={this.onNameChange}
                value={this.props.nameText}
            />
            <Text style={styles.textStyle}>Email</Text>
            <TextInput
                style={styles.inputStyle}
                placeholder=' Enter Your Email Here'
                onChangeText={this.onEmailChange}
                value={this.props.emailText}
            />
            <Text style={styles.textStyle}>Message</Text>
            <TextInput
                style={{ ...styles.inputStyle, ...styles.messageInput }}
                placeholder=' Enter Your Message Here'
                onChangeText={this.onMessageChange}
                value={this.props.messageText}
                multiline
            />
            <View style={{ flex: 1 }}>
                <View style={styles.buttonContainer}>
                    <Button
                        onPress={this.submitInfo}
                        disabled={!this.isValidForm()}
                        style={{ ...styles.buttonPositionStyle, ...currentButtonStyle }}
                        updatedText={this.isValidForm() ? styles.activeButtonText : styles.disabledTextStyle}
                    >
                        Submit
                    </Button>
                </View>
                {/* {this.showSentMessage()} */}
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

const styles = {
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
        height: 100
    },
    textStyle: {
        marginLeft: 15,
        marginTop: 10,
        fontWeight: 'bold'
    },
    sentContainer: {
        flex: 4,
        justifyContent: 'flex-start',
        alignItems: 'center',
        // marginTop: 10,
        // marginBottom: 10,
        // borderWidth: 1
    },
    buttonContainer: {
        flex: 1,
        // justifyContent: 'flex-start',
        // borderWidth: 1,
        // borderColor: 'black',
        flexDirection: 'row',
        marginTop: 15
    },
    buttonPositionStyle: {
      alignSelf: 'flex-start',
    },
    disabledButtonStyle: {
      borderColor: 'gray',
      // opacity: 0.5
    },
    disabledTextStyle: {
      color: 'gray',
      // opacity: 0.5
    },
    activeButtonText: {
      color: 'white',
      fontWeight: '800'
    },
    activeButton: {
      backgroundColor: '#007aff'
    }
};
