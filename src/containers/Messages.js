'use-strict';

import { connect } from 'react-redux';
import _ from 'lodash';
import { getMessages, setRefresh, refreshMessages } from '../actions/MessageActions';
import MessageList from '../components/chat/MessageList';

// Send message information as props to MessageList Component
const mapStateToProps = state => {
    // debugger;
  const { messagesToShow, isRefreshing, refreshedMessages, currentChatRoom } = state.messages;
  // const messages = messagesToShow.map(item => _.values(item));
  // const currentMessages = messagesToShow[currentChatRoom] || {};
  // const messages = [...currentMessages, ...refreshedMessages];
  const keys = getKeys(messagesToShow);
  const messages = [...messagesToShow, ...refreshedMessages];
  // const reversedMessages = _.values(messagesToShow).reverse();
  // const reversedKeys = Object.keys(messagesToShow).reverse();
  // const lastTimeStamp = [];
  // if (!_.isEmpty(messagesToShow)){
  //     const lastKey = keys[keys.length - 1];
  //     debugger;
  //     const lastMessage = messagesToShow[messagesToShow.length - 1];
  //     lastTimeStamp = lastMessage[lastKey].timestamp;
  // }
  // const isRefreshing = state.messagesisRefreshing;
  return (
    {
      messagesToDisplay: messages,
      messageKeys: keys,
      currentChatRoom,
      isRefreshing,
      // lastTimeStamp
    }
  );
};

const getKeys = (messageArray) => {
        const keys = messageArray.map(item => {
            const keyArray = Object.keys(item);
            const key = keyArray[0];
            return key;
        });
        return keys;
};

// Send actions as props to MessageList Component
const mapDispatchToProps = dispatch => {
  return (
    {
      getMessages: (currentChatRoom, lastKey) => {
        dispatch(getMessages(currentChatRoom, lastKey));
    },
    setRefresh: (isRefreshing) => {
        dispatch(setRefresh(isRefreshing));
    },
    refreshMessages: (currentChatRoom, currentMessages) => {
        dispatch(refreshMessages(currentChatRoom, currentMessages));
    }
  });
};

const Messages = connect(
  mapStateToProps,
  mapDispatchToProps
)(MessageList);

export default Messages;
