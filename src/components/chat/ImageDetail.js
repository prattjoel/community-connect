'use-strict';

import React, { Component } from 'react';
import {
    Modal,
    View,
    Dimensions,
    TouchableHighlight,
    Image
} from 'react-native';
import Expo from 'expo';
import { Image as CacheImage } from 'react-native-expo-image-cache';
import { Ionicons } from '@expo/vector-icons';

export default class ImageDetail extends Component {

  // componentWillMount() {
  //
  // }

  onShowImage = () => {
    if (this.props.imageDetailUrl !== '') {
      Image.getSize(this.props.imageDetailUrl, (width, height) => {
        console.log('imageSize', width, height);
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
      });
      return this.props.imageDetailSize;
    }
    // Expo.FileSystem.readDirectoryAsync(`${Expo.FileSystem.cacheDirectory}expo-image-cache/`).then(
    //   (result) => {
    //     console.log('fileSystemInfo:', result);
    //   }
    // );
  }

  checkImageSize = (imageUrl) => {
    if (imageUrl !== '') {
      Image.getSize(imageUrl, (width, height) => {
        console.log('imageSize', width, height);
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
      });
      return this.props.imageDetailSize;
    }
  };

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
             {...{ uri: this.props.imageDetailUrl }}
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
