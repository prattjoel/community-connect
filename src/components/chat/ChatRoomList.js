'use-strict';

import React, { Component } from 'react';
import { FlatList, Keyboard } from 'react-native';
import ChatRoomListItem from './ChatRoomListItem';
import {
  GENERAL_CHAT_ROOM,
  PRAYER_CHAT_ROOM,
  SMALL_GROUP_CHAT_ROOM
} from '../../constants/chatRoomTypes.js';

const data = [
  { room: 'Prayer', key: PRAYER_CHAT_ROOM },
  { room: 'General', key: GENERAL_CHAT_ROOM },
  { room: 'Conversation Circle', key: SMALL_GROUP_CHAT_ROOM }
];

export default class ChatRoomList extends Component {
  componentWillMount() {
      // console.log('Chatroom: ');
      // console.log(this.props.currentChatRoom);
      // debugger;
      // Keyboard.dismiss();
  }

  updateChatRoom = (room) => {
    this.props.setChatRoom(room);
  }

  renderChatRoom = ({ item }) => {
    // debugger;
    return (
      <ChatRoomListItem
        onPress={this.updateChatRoom}
        roomKey={item.key}
        getMessages={this.props.getMessages}
        navigation={this.props.navigation}
      >
        {item.room}
      </ChatRoomListItem>
    );
  }

  render() {
      return (
        <FlatList
            style={{ backgroundColor: '#fff' }}
          data={data}
          renderItem={this.renderChatRoom}
          keyboardDismissMode='on-drag'
        />
      );
    }
}
