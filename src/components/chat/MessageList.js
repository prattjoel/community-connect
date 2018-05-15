'use-strict';

import React, { Component } from 'react';
import { FlatList, View, RefreshControl, Dimensions } from 'react-native';
import _ from 'lodash';
import MessageText from './MessageText';
// import KeyboardManager from './KeyboardManager';

export default class MessageList extends Component {

  componentWillMount() {
    // Get messages from chat room in firebase
    // debugger;
    const { getMessages, currentChatRoom, messagesToDisplay } = this.props;
    // const currentRoom = announcementRoom || currentChatRoom;
    console.log('current chat room in message list:', currentChatRoom);
    console.log('current message list:', messagesToDisplay);

    if (messagesToDisplay.length < 1) {
        getMessages(currentChatRoom);
        if (!this.props.isLoadingMessages) {
            this.props.setIsLoading(true);
        }
    }

    // console.log('chat room in message list');
    // console.log(currentChatRoom);
  }

  //Retrieve previous messages from database
  getOlderMessages = () => {
      // debugger;
      // console.log('end reached');
    const {
        refreshMessages,
        currentChatRoom,
        messagesToDisplay,
        isLoadingMessages
    } = this.props;

    // console.log('message count: ', messagesToDisplay.length);
    // console.log('is loading: ', isLoadingMessages);

    if (!isLoadingMessages) {
        refreshMessages(currentChatRoom, messagesToDisplay);
        console.log('refreshed');
    }
  };

  // Assign unique key from firebase to each message
  keyExtractor = (item) => {
      // debugger;
      const key = Object.keys(item)[0];
      return key;
  }

  renderItem = ({ item }) => {
    // debugger;
    const messageInfo = _.values(item)[0];
    if (messageInfo.message) {
        return (
          <MessageText
            timestamp={messageInfo.timeToShow}
            name={messageInfo.name}
            profilePicUrl={messageInfo.profilePhotoUrl}
          >
            {messageInfo.message}
          </MessageText>
        );
    } else {
        return (
          <MessageText
            timestamp={messageInfo.timeToShow}
            name={messageInfo.name}
            photoUrl={messageInfo.photoUrl}
            profilePicUrl={messageInfo.profilePhotoUrl}
            toggleImageDetail={this.props.toggleImageDetail}
            showImageDetail={this.props.showImageDetail}
          />
        );
    }
  };

  renderHeader = () => {
    // TODO: create custom headers for message sections - Date time etc.
  };

  render() {
    // debugger;

    return (
            <View style={{ flex: 8, backgroundColor: 'white', borderBottomWidth: 0.25, borderBottomColor: 'gray' }}>
              <FlatList
                data={this.props.messagesToDisplay}
                renderItem={this.renderItem}
                keyExtractor={this.keyExtractor}
                onEndReached={this.getOlderMessages.bind(this)}
                onEndReachedThreshold={0.1}
                inverted
              />
            </View>
    );
  }
}
