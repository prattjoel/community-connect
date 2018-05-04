'use-strict';

import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { Text } from 'react-native';
import MessagePage from './MessagesHome';
import { setChatRoom } from '../actions/ChatRoomActions';
import { ANNOUNCEMENTS } from '../actions/types';

class AnnouncementsPage extends Component {
  componentWillMount() {
    console.log(ANNOUNCEMENTS);
    this.props.setChatRoom(ANNOUNCEMENTS);
  }
  render() {
    return (
      <MessagePage />
        );
  }
}

const mapDispatchToProps = dispatch => {
  return ({
    setChatRoom: (currentChatRoom) => {
      dispatch(setChatRoom(currentChatRoom));
    }
  });
};

const Announcements = connect(
  null,
  mapDispatchToProps
)(AnnouncementsPage);

export default Announcements;
