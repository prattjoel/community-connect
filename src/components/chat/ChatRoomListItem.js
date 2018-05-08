'use-strict';

import React, { Component } from 'react';
import {
    TouchableOpacity,
    Text,
} from 'react-native';
import ListSection from '../common/ListSection';


export default class ChatRoomListItem extends Component {
    onPressItem = () => {
        // Update current chat room with the current chat room key
        this.props.onPress(this.props.roomKey);

        // Navigate to Messages screen - pass current room label and announcements page status
        this.props.navigation.navigate('Messages', {
            currentChatroom: this.props.room,
            isAnnouncements: this.props.isAnnouncements
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
