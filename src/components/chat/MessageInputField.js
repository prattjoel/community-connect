'use-strict';

import React, { Component } from 'react';
import {
    View,
    TextInput,
    CameraRoll
} from 'react-native';
import Button from '../common/Button';

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

  render() {
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
              {/* <Button
                  onPress={this.onImageButtonPressed.bind(this)}
                  style={{ alignSelf: 'auto' }}
              >
                  Image
              </Button> */}
              <Button
                onPress={this.onSendButtonPressed.bind(this)}
                updatedText={{ fontSize: 12, paddingLeft: 5, paddingRight: 5 }}
                // style={{ alignSelf: 'auto' }}
              >
                  Send
              </Button>
          </View>

        {/* <View style={styles.buttonContainerStyle}>
            <Button
                onPress={this.onImageButtonPressed.bind(this)}
                // style={{ alignSelf: 'auto' }}
            >
                Image
            </Button>
            <Button
              onPress={this.onSendButtonPressed.bind(this)}
              // style={{ alignSelf: 'auto' }}
            >
                Send
            </Button>
        </View> */}
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
      height: 75,
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
      // flexDirection: 'row',
      // borderWidth: 1,
      // borderColor: 'red'
  }
};
