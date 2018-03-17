'use-strict';

import React from 'react';
import {
  View,
  Text,
  Image
} from 'react-native';

// TODO:
//Add image to messages if url is present
const MessageText = (props) => {

    if (props.photoUrl) {
        return (
          <View style={styles.containerStyle}>
            <Image
              source={require('../../assets/profilePlaceholder.png')}
              style={{ width: 20, height: 20 }}
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
              <View style={{ paddingTop: 5, paddingBottom: 5 }}>
                  <Image
                    source={{ uri: props.photoUrl }}
                    style={{ width: 200, height: 200 }}
                  />
              </View>
            </View>
          </View>
        );
    } else {
        return (
          <View style={styles.containerStyle}>
            <Image
              source={require('../../assets/profilePlaceholder.png')}
              style={{ width: 20, height: 20 }}
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
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    borderColor: '#d3d3d3'
  },
  textStyle: {
    paddingLeft: 10,
    fontSize: 14
  },
  timestampStyle: {
    paddingLeft: 10,
    fontSize: 10
  },
  nameStyle: {
    paddingLeft: 10,
    fontSize: 14,
    fontWeight: 'bold'
  }
};

export default MessageText;
