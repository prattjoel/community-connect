'use-strict';

import React, { Component } from 'react';
import {
    View,
    TextInput,
    CameraRoll
} from 'react-native';
import Button from '../common/Button';
import IconButton from '../common/IconButton';

export default class MessageInputField extends Component {
  componentWillMount() {
    console.log('chat room in message input field');
    console.log(this.props.currentChatRoom);
  }

  onMessageChange(text) {
    this.props.updateMessageText(text);
  }

  onSendButtonPressed() {
    const { message, currentChatRoom } = this.props;

    if (message !== '') {
      this.props.sendMessage('message', message, currentChatRoom);
    } else {
      console.log('No message included');
    }
  }

  onImageButtonPressed() {
      this.props.showImageSelector(!this.props.showImages);

      CameraRoll.getPhotos({ first: 20 })
      .then(res => {
          const imageArray = res.edges;
          this.props.setCurrentImages(imageArray);
          // console.log(res, 'images data');
    });
  }

  userIsTyping() {
      const { message } = this.props;
      if (message !== '') {
          return true;
      }
      return false;
  }



  render() {
      const isTypingTextStyle = { ...styles.buttonText, ...styles.isTypingButtonTextStyle };
      // const isTypingButtonStyle =
    return (
      <View style={styles.containerStyle}>
          <View style={{ flex: 1 }}>
              <TextInput
                style={styles.textInputStyle}
                placeholder='Type Message Here'
                onChangeText={this.onMessageChange.bind(this)}
                value={this.props.message}
              />
          </View>
          <View style={styles.buttonContainerStyle}>
              <IconButton
                  // name={this.userIsTyping() ? 'ios-images' : 'ios-images-outline'}
                  name='ios-images'
                  size={25}
                  style={styles.iconStyle}
                  onPress={this.onImageButtonPressed.bind(this)}
                  // imageStyle={{ }}
              />
              <Button
                onPress={this.onSendButtonPressed.bind(this)}
                updatedText={this.userIsTyping() ? isTypingTextStyle : styles.buttonText}
                style={this.userIsTyping() ? styles.isTypingButton : styles.notTypingButton}
              >
                  Send
              </Button>
          </View>
      </View>
    );
  }
}

const styles = {
  textInputStyle: {
    height: 40,
    // borderColor: 'gray',
    // borderWidth: 1,
    // borderRadius: 5,
    marginLeft: 5,
    paddingLeft: 5,
    paddingBottom: 15,
    flex: 1,
    // alignSelf: 'flex-end'
  },
  containerStyle: {
      height: 70,
      marginTop: 10,
      // flexDirection: 'row',
      paddingBottom: 5,
      backgroundColor: 'white',
      // alignContent: 'space-around',
      // borderTopWidth: 1,
      // borderWidth: 1,
      // borderColor: 'red'
  },
  buttonContainerStyle: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'flex-end',
      marginRight: 15
      // borderWidth: 1,
      // borderColor: 'red'
  },
  buttonText: {
    fontSize: 14,
    fontWeight: '900',
    // padding: 100
    paddingLeft: 5,
    paddingRight: 5,
    paddingTop: 5,
    paddingBottom: 5,
    color: 'gray'
  },
  isTypingButtonTextStyle: {
      color: 'white'
  },
  isTypingButton: {
      backgroundColor: '#007AFF'
  },
  notTypingButton: {
      borderColor: 'gray'
  },
  iconStyle: {
      flex: 5,
      paddingRight: 10,
      // borderWidth: 1,
      // borderColor: 'green',
      alignItems: 'flex-end'
  }
};
