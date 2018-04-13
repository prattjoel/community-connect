'use-strict';

import React from 'react';
import {
  View,
  Text,
  Image,
  Dimensions
} from 'react-native';
import { Image as CacheImage } from 'react-native-expo-image-cache';

const MessageText = (props) => {
    // // debugger;
    // console.log('photo url in message text: ', props.profilePicUrl);
    const { width } = Dimensions.get('window');
    const imageWidth = 0.85 * width;
    const preview = require('../../assets/messageImagePlaceholder.png');
    // debugger;
    // console.log('profile url in mesagetext: ', props.profilePicUrl);

    if (props.photoUrl) {
        return (
          <View style={styles.containerStyle}>
            <Image
              // source={require('../../assets/profilePlaceholder.png')}
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
                  {/* <Image
                    source={{ uri: props.photoUrl }}
                    style={{ width: 200, height: 200 }}
                  /> */}
                  <CacheImage
                    {...{ uri: props.photoUrl, preview }}
                    style={{ width: imageWidth, height: 200, borderRadius: 5 }}
                  />
              </View>
            </View>
          </View>
        );
    } else {
        return (
          <View style={styles.containerStyle}>
            <Image
              // source={require('../../assets/profilePlaceholder.png')}
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
    // borderTopWidth: 0.5,
    // borderBottomWidth: 0.5,
    // borderColor: '#d3d3d3'
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
