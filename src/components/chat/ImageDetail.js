'use-strict';

import React, { Component } from 'react';
import {
    Modal,
    View,
    Dimensions,
    TouchableHighlight,
    LayoutAnimation
} from 'react-native';
import { Image as CacheImage } from 'react-native-expo-image-cache';
import { Ionicons } from '@expo/vector-icons';

export default class ImageDetail extends Component {

  // Set image dimensions depending on if the image was taken in landscape or portrait
  onShowImage = () => {
    const { height, width } = this.props.imageDetailInfo;
    if (width > height) {
      const imageWidth = Dimensions.get('window').width;
      const scaleFactor = width / imageWidth;
      const imageHeight = height / scaleFactor;
      const imageSize = { width: imageWidth, height: imageHeight };
      this.props.setImageDetailSize(imageSize, true);
    } else {
      const imageWidth = Dimensions.get('window').width;
      const windowHeight = (Dimensions.get('window').height * 0.9);
      const imageHeight = windowHeight;
      const imageSize = { width: imageWidth, height: imageHeight };
      this.props.setImageDetailSize(imageSize, false);
    }
  }

// Set image style depending on if the image was taken in landscape or portrait
  setImageStyle = () => {
    if (this.props.isLandscape) {
      const imageStyle = {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 7
      };
      return imageStyle;
    }
    return styles.imageContainer;
  }

  // Show or hide back arrow when the image is tapped
  renderBackArrow = (imageDetailMenuIsVisible) => {
    const backArrow = 'ios-arrow-round-back';
    if (imageDetailMenuIsVisible) {
      return (

          <TouchableHighlight
            onPress={() => {
              const defaultImageSize = { height: 0, width: 0 };
              this.props.setImageDetailSize(defaultImageSize, true);
              this.props.toggleImageDetail(!this.props.showImageDetail);
            }}
          >
            <Ionicons
              name={backArrow}
              size={60}
              style={styles.arrowStyle}
            />
          </TouchableHighlight>
      );
    }
    LayoutAnimation.easeInEaseOut();
  }

  render() {
    return (
      <Modal
        animationType='fade'
        transparent={false}
        visible={this.props.showImageDetail}
        onShow={this.onShowImage}
      >
        <View style={styles.containerStyle}>
          <View
            style={styles.arrowContainer}
          >
          {this.renderBackArrow(this.props.imageDetailMenuIsVisible)}
        </View>
          <TouchableHighlight
            activeOpacity={1}
            onPress={() => {
              // Show or hide menu (arrow button currently) when image is tapped
              this.props.toggleImageDetailMenu(!this.props.imageDetailMenuIsVisible);
            }}
            style={this.setImageStyle()}
          >
              <CacheImage
                 {...{ uri: this.props.imageDetailInfo.photoUrl }}
                 style={this.props.imageDetailSize}
              />
          </TouchableHighlight>
        </View>
      </Modal>
    );
  }
}

const styles = {
  containerStyle: {
    flex: 1,
    backgroundColor: 'black',
  },
  arrowStyle: {
    paddingTop: 30,
    paddingLeft: 10,
    color: 'white',
    backgroundColor: 'black',
  },
  arrowContainer: {
    flex: 1,
    flexDirection: 'row',
    borderColor: 'yellow',
    backgroundColor: 'black',
  },
  imageContainer: {
    alignItems: 'center'
  }
};
