'use-strict';

import { connect } from 'react-redux';
import _ from 'lodash';
import {
  getMessages,
  setRefresh,
  refreshMessages,
  setIsLoading
} from '../actions/MessageActions';
import {
  toggleImageDetail,
  setImageDetailUrl
} from '../actions/ImageActions';
import MessageList from '../components/chat/MessageList';

// Send message information as props to MessageList Component
const mapStateToProps = (state, ownProps) => {
    // debugger;
    // const announcementRoom = ownProps.currentChatRoom;
  const {
      messagesToShow,
      isRefreshing,
      // refreshedMessages,
      currentChatRoom,
      isLoadingMessages,
      canLoadOlderMessages,
      isScrolling
  } = state.messages;
  const {
    showImageDetail,
    imageDetailUrl
  } = state.imagesFromCR;

  const keys = getKeys(messagesToShow);
  return (
    {
      messagesToDisplay: messagesToShow,
      messageKeys: keys,
      currentChatRoom,
      isRefreshing,
      isLoadingMessages,
      canLoadOlderMessages,
      isScrolling,
      showImageDetail,
      imageDetailUrl
      // announcementRoom
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
    },
    setIsLoading: (isLoading) => {
        dispatch(setIsLoading(isLoading));
    },
    toggleImageDetail: (showImageDetail) => {
      dispatch(toggleImageDetail(showImageDetail));
    },
    setImageDetailUrl: (imageDetailUrl) => {
      dispatch(setImageDetailUrl(imageDetailUrl));
    }
  });
};

const Messages = connect(
  mapStateToProps,
  mapDispatchToProps
)(MessageList);

export default Messages;
