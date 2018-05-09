'use-strict';

import React, { Component } from 'react';
import {
    TouchableOpacity,
    Text,
} from 'react-native';
import ListSection from '../common/ListSection';


export default class ChatRoomListItem extends Component {
    onPressItem = () => {
      const {
        onPress,
        roomKey,
        navigation,
        room,
        isAnnouncements,
        isAdmin
       } = this.props;
        // Update current chat room with the current chat room key
        onPress(roomKey);

        // Navigate to Messages screen - pass current room label,
        // administrator status and announcements page status
        navigation.navigate('Messages', {
            currentChatroom: room,
            isAnnouncements,
            isAdmin
        });
    }
    render() {
        return (
            <TouchableOpacity
                onPress={this.onPressItem}
            >
                    <ListSection>
                        <Text style={{ fontSize: 28 }}>{this.props.children}</Text>
                    </ListSection>
            </TouchableOpacity>
            );
        }
    }
