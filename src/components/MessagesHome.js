'use-strict';

import React, { Component } from 'react';
import { View } from 'react-native';
import Messages from '../containers/Messages';
import MessageInput from '../containers/MessageInput';
import KeyboardManager from './common/KeyboardManager';
import ImagesFromCR from '../containers/ImagesFromCR';

export default class HomePage extends Component {
    // componentWillUnMount() {
    //     Keyboard.dismiss();
    //     console.log('keyboard dismissed');
    // }

    // Hide messge input field when announcements page is shown
    showMessageInput = () => {
      // const chatroom = this.props.navigation.getParam('currentChatroom');
      const isAnnouncements = this.props.navigation.getParam('isAnnouncements');
      if (isAnnouncements) {
        return null;
      }
      return (
        <MessageInput />
      );
    }

    render() {
        return (
            <KeyboardManager style={{ flex: 1 }}>
                <View style={{ flex: 1, backgroundColor: 'white' }}>
                    <Messages />
                  {this.showMessageInput()}
                </View>
            </KeyboardManager>
        );
    }
}
