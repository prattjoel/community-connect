'use-strict';

import { connect } from 'react-redux';
import {
  messageChanged,
  sendMessage
} from '../../actions/MessageActions';
import {
    setCurrentImages,
    toggleImageSelector
} from '../../actions/ImageActions';
import MessageInputField from './MessageInputField';

const mapStateToProps = state => {
  return (
    {
      message: state.messages.messageText,
      currentChatRoom: state.chatRooms.currentChatRoom,
      showImages: state.imagesFromCR.showImages
    }
  );
};

const mapDispatchToProps = dispatch => {
  return (
    {
      updateMessageText: text => {
      dispatch(messageChanged(text));
    },
      sendMessage: (type, content, currentChatRoom) => {
        dispatch(sendMessage(type, content, currentChatRoom));
    },
        setCurrentImages: (currentImages) => {
        dispatch(setCurrentImages(currentImages));
    },
        showImageSelector: (showImages) => {
            dispatch(toggleImageSelector(showImages));
    }
  });
};

const MessageInput = connect(
  mapStateToProps,
  mapDispatchToProps
)(MessageInputField);

export default MessageInput;
