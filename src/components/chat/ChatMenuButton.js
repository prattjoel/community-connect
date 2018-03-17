'use-strict';

import React, { Component } from 'react';
import {
  Image,
  TouchableOpacity
} from 'react-native';

export default class ChatMenuButton extends Component {
  onPress = () => {
    // Actions.drawerOpon();
  }
  render() {
    return (
      <TouchableOpacity
        onPress={this.onPress}
      >
        <Image
          source={require('../assets/profilePlaceholder.png')}
          style={{ width: 15, height: 15 }}
        />
      </TouchableOpacity>

    );
  }
}
