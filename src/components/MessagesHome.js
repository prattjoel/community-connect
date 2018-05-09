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

    // Hide messge input field when announcements page is shown and
    // user is not an administrator
    showMessageInput = () => {
      // const chatroom = this.props.navigation.getParam('currentChatroom');
      const isAnnouncements = this.props.navigation.getParam('isAnnouncements');
      const isAdmin = this.props.navigation.getParam('isAdmin');

      if (isAnnouncements && !isAdmin) {
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
                  <ImagesFromCR />
                </View>
            </KeyboardManager>
        );
    }
}
