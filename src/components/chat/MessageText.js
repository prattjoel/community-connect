'use-strict';

import React from 'react';
import {
  View,
  Text,
  Image,
  Dimensions,
  TouchableHighlight
} from 'react-native';
import { Image as CacheImage } from 'react-native-expo-image-cache';

const MessageText = (props) => {
    const { width } = Dimensions.get('window');
    const imageWidth = 0.85 * width;
    const preview = require('../../assets/messageImagePlaceholder.png');

    if (props.photoUrl) {
        return (
          <View style={styles.containerStyle}>
            <Image
              source={props.profilePicUrl ? { uri: props.profilePicUrl } : require('../../assets/profilePlaceholder.png')}
              style={{ width: 20, height: 20, borderRadius: 10 }}
            />
            <View>
              <View style={{ flexDirection: 'row' }}>
                <Text style={styles.nameStyle}>
                  {props.name}
                </Text>
                <Text style={styles.timestampStyle}>
                  {props.timestamp}
                </Text>
              </View>
              <View style={{ paddingTop: 10, paddingBottom: 5 }}>
                  <TouchableHighlight
                    onPress={() => {
                      props.setImageDetailInfo(props.photoUrl, props.imageHeight, props.imageWidth);
                      props.toggleImageDetail(!props.showImageDetail);
                    }}
                  >
                    <CacheImage
                      {...{ uri: props.photoUrl, preview }}
                      style={{ width: imageWidth, height: 200, borderRadius: 5 }}
                    />
                  </TouchableHighlight>
              </View>
            </View>
          </View>
        );
    } else {
        return (
          <View style={styles.containerStyle}>
            <Image
              source={props.profilePicUrl ? { uri: props.profilePicUrl } : require('../../assets/profilePlaceholder.png')}
              style={{ width: 20, height: 20, borderRadius: 10 }}
            />
            <View>
              <View style={{ flexDirection: 'row' }}>
                <Text style={styles.nameStyle}>
                  {props.name}
                </Text>
                <Text style={styles.timestampStyle}>
                  {props.timestamp}
                </Text>
              </View>
              <Text
                style={styles.textStyle}
              >
                {props.children}
              </Text>
            </View>
          </View>
        );
    }
};

const styles = {
  containerStyle: {
    flexDirection: 'row',
    paddingLeft: 10,
    paddingTop: 10,
    paddingRight: 25,
    paddingBottom: 10
  },
  textStyle: {
    paddingLeft: 10,
    fontSize: 14
  },
  timestampStyle: {
    paddingLeft: 10,
    fontSize: 10,
    color: 'gray'
  },
  nameStyle: {
    paddingLeft: 10,
    fontSize: 14,
    fontWeight: 'bold'
  }
};

export default MessageText;
