'use-strict';

import React, { Component } from 'react';
import {
    Modal,
    View,
    Dimensions
    // Image
} from 'react-native';
import { Image as CacheImage } from 'react-native-expo-image-cache';

export default class ImageDetail extends Component {

  render() {
    const { width } = Dimensions.get('window');
    const imageWidth = 0.85 * width;
    const preview = require('../../assets/messageImagePlaceholder.png');
    return (
      <Modal
        animationType='fade'
        transparent={false}
        visible={this.props.showImageDetail}
      >
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
  }
};
