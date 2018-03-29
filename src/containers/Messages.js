'use-strict';

import { connect } from 'react-redux';
import _ from 'lodash';
import { getMessages } from '../actions/MessageActions';
import MessageList from '../components/chat/MessageList';

// Send message information as props to MessageList Component
const mapStateToProps = state => {
    // debugger;
  const { messagesToShow } = state.messages;
  const reversedMessages = _.values(messagesToShow).reverse();
  const reversedKeys = Object.keys(messagesToShow).reverse();
  return (
    {
      messagesToDisplay: reversedMessages,
      messageKeys: reversedKeys,
      currentChatRoom: state.chatRooms.currentChatRoom
    }
  );
};

// Send actions as props to MessageList Component
const mapDispatchToProps = dispatch => {
  return (
    {
      getMessages: (currentChatRoom) => {
        dispatch(getMessages(currentChatRoom));
      }
  });
};

const Messages = connect(
  mapStateToProps,
  mapDispatchToProps
)(MessageList);

export default Messages;
