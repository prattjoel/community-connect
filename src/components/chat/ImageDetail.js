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

  onShowImage = () => {
    const { height, width } = this.props.imageDetailInfo;
    if (width > height) {
      const imageWidth = Dimensions.get('window').width;
      const scaleFactor = width / imageWidth;
      const imageHeight = height / scaleFactor;
      const imageSize = { width: imageWidth, height: imageHeight };
      this.props.setImageDetailSize(imageSize, true);
    } else {
      // const imageWidth = (Dimensions.get('window').width * 0.9);
      const imageWidth = Dimensions.get('window').width;
      const windowHeight = (Dimensions.get('window').height * 0.9);
      const imageHeight = windowHeight;
      const imageSize = { width: imageWidth, height: imageHeight };
      this.props.setImageDetailSize(imageSize, false);
    }
  }

  setImageStyle = () => {
    if (this.props.isLandscape) {
      const imageStyle = {
        // ...styles.containerStyle,
        justifyContent: 'center',
        alignItems: 'center',
        flex: 7
      };
      return imageStyle;
    }
    // const imageStyle = { ..., ...{ justifyContent: this.props.isLandscape ? 'center' : '' }};
    return styles.imageContainer;
  }

  renderBackArrow = (imageDetailMenuIsVisible) => {
    const backArrow = 'ios-arrow-round-back';
    if (imageDetailMenuIsVisible) {
      return (
        // <View
        //   style={styles.arrowContainer}
        // >
          <TouchableHighlight
            // style={styles.arrowContainer}
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
        // {/* </View> */}
      );
    }
    LayoutAnimation.easeInEaseOut();
  }

  render() {
    const preview = require('../../assets/messageImagePlaceholder.png');
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
              this.props.toggleImageDetailMenu(!this.props.imageDetailMenuIsVisible);
            }}
            style={this.setImageStyle()}
          >
            {/* <View
              style={this.setImageStyle()}
            > */}
              <CacheImage
                 {...{ uri: this.props.imageDetailInfo.photoUrl }}
                 style={this.props.imageDetailSize}
              />
            {/* </View> */}
          </TouchableHighlight>
        </View>
      </Modal>
    );
  }
}

const windowWidth = Dimensions.get('window').width;

const styles = {
  containerStyle: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: 'black',
    // borderColor: 'red',
    // borderWidth: 2,
  },
  arrowStyle: {
    paddingTop: 30,
    paddingLeft: 10,
    color: 'white',
    backgroundColor: 'black',
    // alignSelf: 'flex-start'
  },
  arrowContainer: {
    // position: 'absolute',
    // top: 0,
    // left: 0,
    // // bottom: 0,
    // right: 0,
    flex: 1,
    flexDirection: 'row',
    borderColor: 'yellow',
    // borderWidth: 2,
    backgroundColor: 'black',
    // opacity: 0.5
  },
  imageContainer: {
    // borderColor: 'blue',
    // borderWidth: 2,
    alignItems: 'center'
    // position: 'absolute',
    // top: 0,
    // bottom: 0,
    // left: 0,
    // right: 0,
  }
};
