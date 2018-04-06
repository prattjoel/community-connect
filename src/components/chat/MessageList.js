'use-strict';

import React, { Component } from 'react';
import { FlatList, View, RefreshControl } from 'react-native';
import _ from 'lodash';
import MessageText from './MessageText';
// import KeyboardManager from './KeyboardManager';

export default class MessageList extends Component {

  componentWillMount() {
    // Get messages from chat room in firebase
    const { getMessages, currentChatRoom } = this.props;

    // debugger;
    // getMessages(currentChatRoom);


    console.log('chat room in message list');
    console.log(currentChatRoom);
  }

  getOlderMessages = () => {
      // debugger;
    this.props.setRefresh(this.props.isRefreshing);
    const { getMessages, currentChatRoom, lastKey } = this.props;
    getMessages(currentChatRoom, lastKey);
    console.log('refreshed');
    setTimeout(() => {
        this.props.setRefresh(this.props.isRefreshing);
    }, 3000);
  };

  // Assign unique key from firebase to each message
  keyExtractor = (item, index) => {
      // debugger;
      const key = Object.keys(item)[0];
      return key;
    // return this.props.messageKeys[index];
  }

  renderItem = ({ item }) => {
    // debugger;
    const messageInfo = _.values(item)[0];
    if (messageInfo.message) {
        return (
          <MessageText
            timestamp={messageInfo.timestamp}
            name={messageInfo.name}
            profilePicUrl={messageInfo.profilePhotoUrl}
          >
            {messageInfo.message}
          </MessageText>
        );
    } else {
        return (
          <MessageText
            timestamp={messageInfo.timestamp}
            name={messageInfo.name}
            photoUrl={messageInfo.photoUrl}
            profilePicUrl={messageInfo.profilePhotoUrl}
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
                // onEndReached={() => console.log('onEndReached')}
                // refreshControl={
                //   <RefreshControl
                //     refreshing={this.props.isRefreshing}
                //     onRefresh={this.getOlderMessages.bind(this)}
                //   />
                // }
                refreshing={this.props.isRefreshing}
                onRefresh={this.getOlderMessages.bind(this)}
                // onRefresh={() => log)
                inverted
                // extraData={this.state}
              />
            </View>
    );
  }
}
