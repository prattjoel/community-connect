'use-strict';

import { connect } from 'react-redux';
import { setChatRoom } from '../actions/ChatRoomActions';
import { getMessages } from '../actions/MessageActions';
import ChatRoomList from '../components/chat/ChatRoomList';
// import MessageList from '../components/MessageList';

//
const mapStateToProps = state => {
  const { currentChatRoom } = state.chatRooms;
  // debugger;
  return (
    {
      currentChatRoom,
      availableChatRooms: state.chatRooms
    }
  );
};

//
const mapDispatchToProps = dispatch => {
  return (
    {
      setChatRoom: (currentChatRoom) => {
        dispatch(setChatRoom(currentChatRoom));
      },
    getMessages: (currentChatRoom) => {
      dispatch(getMessages(currentChatRoom));
    }
  });
};

const ChatRooms = connect(
  mapStateToProps,
  mapDispatchToProps
)(ChatRoomList);

export default ChatRooms;
