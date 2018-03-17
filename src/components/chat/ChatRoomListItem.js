'use-strict';

import React, { Component } from 'react';
import {
    TouchableOpacity,
    Text,
} from 'react-native';
import ListSection from '../common/ListSection';


export default class ChatRoomListItem extends Component {
    onPressItem = () => {
        this.props.onPress(this.props.roomKey);
        this.props.getMessages(this.props.roomKey);

        // Navigate to Messages screen
        this.props.navigation.navigate('Messages');
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
