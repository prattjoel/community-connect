'use-strict';

import React, { Component } from 'react';
import {
    Modal,
    View,
    Dimensions,
    TouchableHighlight
    // Image
} from 'react-native';
import { Image as CacheImage } from 'react-native-expo-image-cache';
import { Ionicons } from '@expo/vector-icons';

export default class ImageDetail extends Component {

  render() {
    const { width } = Dimensions.get('window');
    const imageWidth = 0.85 * width;
    const preview = require('../../assets/messageImagePlaceholder.png');
    const backArrow = 'ios-arrow-round-back';
    return (
      <Modal
        animationType='fade'
        transparent={false}
        visible={this.props.showImageDetail}
      >
        <TouchableHighlight
          onPress={() => {
            this.props.toggleImageDetail(!this.props.showImageDetail);
          }}
        >
          <Ionicons
            name={backArrow}
            size={60}
            style={styles.arrowStyle}
          />
        </TouchableHighlight>

        <View style={styles.containerStyle}>
          <CacheImage
             {...{ uri: this.props.imageDetailUrl, preview }}
             style={{ width: imageWidth, height: 200, borderRadius: 5 }}
          />
        </View>
      </Modal>
    );
  }
}

const styles = {
  containerStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black'
  },
  arrowStyle: {
    paddingTop: 30,
    paddingLeft: 10,
    color: 'white',
    backgroundColor: 'black'
  }
};
