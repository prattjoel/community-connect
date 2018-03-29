'use-strict';

import React, { Component } from 'react';
import { FlatList, View } from 'react-native';
import MessageText from './MessageText';
// import KeyboardManager from './KeyboardManager';

export default class MessageList extends Component {

  componentWillMount() {
    // Get messages from chat room in firebase
    const { getMessages, currentChatRoom } = this.props;

    getMessages(currentChatRoom);

    console.log('chat room in message list');
    console.log(currentChatRoom);
  }

  // Assign unique key from firebase to each message
  keyExtractor = (item, index) => {
    return this.props.messageKeys[index];
  }

  renderItem = ({ item }) => {
    // debugger;
    if (item.message) {
        return (
          <MessageText
            timestamp={item.timestamp}
            name={item.name}
            profilePicUrl={item.profilePhotoUrl}
          >
            {item.message}
          </MessageText>
        );
    } else {
        return (
          <MessageText
            timestamp={item.timestamp}
            name={item.name}
            photoUrl={item.photoUrl}
            profilePicUrl={item.profilePhotoUrl}
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
                // extraData={this.state}
                inverted
              />
            </View>
    );
  }
}
