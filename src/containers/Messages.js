'use-strict';

import { connect } from 'react-redux';
import _ from 'lodash';
import { getMessages, setRefresh } from '../actions/MessageActions';
import MessageList from '../components/chat/MessageList';

// Send message information as props to MessageList Component
const mapStateToProps = state => {
    // debugger;
  const { messagesToShow, isRefreshing } = state.messages;
  const reversedMessages = _.values(messagesToShow).reverse();
  const reversedKeys = Object.keys(messagesToShow).reverse();
  const lastKey = reversedKeys[reversedKeys.length - 1];
  // const isRefreshing = state.messagesisRefreshing;
  return (
    {
      messagesToDisplay: reversedMessages,
      messageKeys: reversedKeys,
      currentChatRoom: state.chatRooms.currentChatRoom,
      isRefreshing,
      lastKey
    }
  );
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
    }
  });
};

const Messages = connect(
  mapStateToProps,
  mapDispatchToProps
)(MessageList);

export default Messages;
