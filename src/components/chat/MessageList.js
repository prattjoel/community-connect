'use-strict';

import React, { Component } from 'react';
import { FlatList, View, RefreshControl, Dimensions } from 'react-native';
import _ from 'lodash';
import MessageText from './MessageText';
// import KeyboardManager from './KeyboardManager';

export default class MessageList extends Component {
  //   constructor(props) {
  //   super(props);
  //   this.getOlderMessages = _.debounce(this.getOlderMessages, 500);
  // }

  componentWillMount() {
    // Get messages from chat room in firebase
    const { getMessages, currentChatRoom } = this.props;
    // if (this.props.canLoadOlderMessages) {
    //     this.props.setCanLoadOlderMessages(this.props.canLoadOlderMessages);
    // }

    if (!this.props.isScrolling) {
        this.props.setIsScrolling(true);
    }

    if (this.props.messagesToDisplay.length < 1) {
        // debugger;
        getMessages(currentChatRoom);
    }

    // getMessages(currentChatRoom);
    console.log('chat room in message list');
    console.log(currentChatRoom);
  }

  getOlderMessages = () => {
      // debugger;
      console.log('end reached');
    // this.props.setRefresh(this.props.isRefreshing);
    const {
        refreshMessages,
        // isRefreshing,
        // setRefresh,
        currentChatRoom,
        messagesToDisplay,
        // setCanLoadOlderMessages,
        // canLoadOlderMessages,
        // isScrolling,
        // setIsScrolling,
        isLoadingMessages
    } = this.props;

    // if (isScrolling) {
    //     setCanLoadOlderMessages(canLoadOlderMessages);
    // }
    console.log('message count: ', messagesToDisplay.length);
    console.log('is loading: ', isLoadingMessages);

    if (!isLoadingMessages) {
        // debugger;
        // setRefresh(isRefreshing);
        refreshMessages(currentChatRoom, messagesToDisplay);
        // setCanLoadOlderMessages(canLoadOlderMessages);
        console.log('refreshed');
        // setIsScrolling(false);
        // setRefresh(isRefreshing);

        // setTimeout(() => {
        //
        // }, 1000);
        // setRefresh(isRefreshing);
    }
    // if (messagesToDisplay.length >= 20 && !canLoadOlderMessages) {
    //     setCanLoadOlderMessages(canLoadOlderMessages);
    // }
    // if (canLoadOlderMessages) {
    //     // debugger;
    //     setRefresh(isRefreshing);
    //     refreshMessages(currentChatRoom, messagesToDisplay);
    //     setCanLoadOlderMessages(canLoadOlderMessages);
    //     console.log('refreshed');
    //     setRefresh(isRefreshing);
    // }
        // setTimeout(() => {
        //     this.props.setRefresh(this.props.isRefreshing);
        // }, 3000);
    // }
  };

  componWillUnMount() {
      debugger;
  }

  // Assign unique key from firebase to each message
  keyExtractor = (item, index) => {
      // debugger;
      const key = Object.keys(item)[0];
      return key;
    // return this.props.messageKeys[index];
  }

  renderItem = ({ item, index }) => {
    // debugger;
    // console.log('index: ', index);
    const messageInfo = _.values(item)[0];
    // if (index === 0) {
    //     console.log('message at 0 index', messageInfo.message);
    // }
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
          />
        );
    }
  };

  // manageScroll = (event) => {
  //     const topScrollPosition = (Dimensions.get('window').height / 2);
  //     const currentScroolPosition = event.nativeEvent.contentOffset.y;
  //     console.log('topScrollPosition is:', topScrollPosition);
  //     console.log(event.nativeEvent.contentOffset.y);
  //     // if (currentScroolPosition > topScrollPosition) {
  //     //     const {
  //     //         refreshMessages,
  //     //         isRefreshing,
  //     //         setRefresh,
  //     //         currentChatRoom,
  //     //         messagesToDisplay
  //     //     } = this.props;
  //     //     setRefresh(isRefreshing);
  //     //     refreshMessages(currentChatRoom, messagesToDisplay);
  //     //     // getMessages(currentChatRoom, lastTimeStamp);
  //     //
  //     //     console.log('refreshed');
  //     //     setTimeout(() => {
  //     //         this.props.setRefresh(this.props.isRefreshing);
  //     //     }, 3000);
  //     // }
  // }

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
                // onMomentumScrollBegin={() => {
                //     console.log('scrolling');
                //     this.props.setIsScrolling(false);
                // }}
                inverted
                // onEndReached={() => {
                //     console.log('end reached');
                // }}
                // bounces={false}
                // refreshControl={
                //   <RefreshControl
                //     refreshing={this.props.isRefreshing}
                //     onRefresh={this.getOlderMessages.bind(this)}
                //   />
                // }
                // refreshing={this.props.isRefreshing}
                // onRefresh={this.getOlderMessages.bind(this)}
                // onRefresh={() => log)
                // onScroll={this.manageScroll}
                // extraData={this.state}
              />
            </View>
    );
  }
}
