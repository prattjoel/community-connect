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
  //
  // componentWillUpdate(nextProps) {
  //   const { getMessages, currentChatRoom } = nextProps;
  //
  //   getMessages(currentChatRoom);
  //   console.log('chat room in componentWillReceiveProps');
  //   console.log(currentChatRoom);
  // }

  // Assign unique key from firebase to each message
  keyExtractor = (item, index) => {
    return this.props.messageKeys[index];
  }

  renderItem = ({ item }) => {
     // TODO: display image messages if message in database has url
    // TODO: create custom list item and render user's info along with message content
    // debugger;
    if (item.message) {
        return (
          <MessageText
            timestamp={item.timestamp}
            name={item.name}
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
            <View style={{ flex: 10, backgroundColor: 'white', paddingBottom: 25 }}>
              <FlatList
                data={this.props.messagesToDisplay.reverse()}
                renderItem={this.renderItem}
                keyExtractor={this.keyExtractor}
                inverted
              />
            </View>
    );
  }
}
