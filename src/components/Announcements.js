'use-strict';

import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import { Text } from 'react-native';
import MessageSelector from '../containers/ChatRooms';
import {
  WEEKLY_ANNOUNCEMENT_ROOM,
  EVENT_ANNOUNCEMENT_ROOM,
  COMMUNITY_ANNOUNCEMENT_ROOM
} from '../actions/types';
// import { setChatRoom } from '../actions/ChatRoomActions';
// import { ANNOUNCEMENTS } from '../actions/types';

const announcementListData = [
  { room: 'Weekly', key: WEEKLY_ANNOUNCEMENT_ROOM },
  { room: 'Events', key: EVENT_ANNOUNCEMENT_ROOM },
  { room: 'Community', key: COMMUNITY_ANNOUNCEMENT_ROOM }
];

export default class AnnouncementsPage extends Component {
  // componentWillMount() {
  //   console.log(ANNOUNCEMENTS);
  //   this.props.setChatRoom(ANNOUNCEMENTS);
  // }
  render() {
    return (
      <MessageSelector
        selectorData={announcementListData}
        navigation={this.props.navigation}
      />
        );
  }
}

// class AnnouncementsPage extends Component {
//   componentWillMount() {
//     console.log(ANNOUNCEMENTS);
//     this.props.setChatRoom(ANNOUNCEMENTS);
//   }
//   render() {
//     return (
//       <MessagePage />
//         );
//   }
// }
//
// const mapDispatchToProps = dispatch => {
//   return ({
//     setChatRoom: (currentChatRoom) => {
//       dispatch(setChatRoom(currentChatRoom));
//     }
//   });
// };
//
// const Announcements = connect(
//   null,
//   mapDispatchToProps
// )(AnnouncementsPage);
//
// export default Announcements;
