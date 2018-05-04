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
    render() {
        return (
            <KeyboardManager style={{ flex: 1 }}>
                <View style={{ flex: 1, backgroundColor: 'white' }}>
                    <Messages
                      currentChatRoom={this.props.currentChatRoom}
                    />
                    <MessageInput />
                </View>
                <ImagesFromCR />
            </KeyboardManager>
        );
    }
}
