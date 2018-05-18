'use-strict';

import React, { Component } from 'react';
import {
    Modal,
    View,
    Dimensions,
    TouchableHighlight,
} from 'react-native';
import { Image as CacheImage } from 'react-native-expo-image-cache';
import { Ionicons } from '@expo/vector-icons';

export default class ImageDetail extends Component {

  onShowImage = () => {
    const { height, width } = this.props.imageDetailInfo;
    if (width > height) {
      const imageWidth = Dimensions.get('window').width;
      const scaleFactor = width / imageWidth;
      const imageHeight = height / scaleFactor;
      const imageSize = { width: imageWidth, height: imageHeight };
      this.props.setImageDetailSize(imageSize);
    } else {
      const imageWidth = Dimensions.get('window').width;
      const imageHeight = Dimensions.get('window').height;
      const imageSize = { width: imageWidth, height: imageHeight };
      this.props.setImageDetailSize(imageSize);
    }
  }

  render() {
    const preview = require('../../assets/messageImagePlaceholder.png');
    const backArrow = 'ios-arrow-round-back';
    return (
      <Modal
        animationType='fade'
        transparent={false}
        visible={this.props.showImageDetail}
        onShow={this.onShowImage}
      >
        <TouchableHighlight
          onPress={() => {
            const defaultImageSize = { height: 0, width: 0 };
            this.props.setImageDetailSize(defaultImageSize);
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
             {...{ uri: this.props.imageDetailInfo.photoUrl }}
             style={this.props.imageDetailSize}
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
