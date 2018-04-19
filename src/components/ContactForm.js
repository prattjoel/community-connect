'use-strict';

import React from 'react';
import {
    Text,
    View,
    StyleSheet,
    TextInput
 } from 'react-native';

const ContactForm = () => {
  return (
      <View style={styles.containerStyle}>
          <Text style={styles.textStyle}>Name</Text>
          <TextInput
              style={styles.inputStyle}
              placeholder=' Enter Name Here'
          />
          <Text style={styles.textStyle}>Email</Text>
          <TextInput
              style={styles.inputStyle}
              placeholder=' Enter Email Here'
          />
          <Text style={styles.textStyle}>Message</Text>
          <TextInput
              style={StyleSheet.flatten([styles.inputStyle, styles.messageInput])}
              placeholder=' Enter Message Here'
              multiline
          />
      </View>
  );
};

const styles = StyleSheet.create({
    containerStyle: {
        flex: 1,
        backgroundColor: 'white',
        // justifyContent: 'center'
    },
    inputStyle: {
        height: 40,
        borderWidth: 0.5,
        borderRadius: 5,
        borderColor: 'gray',
        marginRight: 10,
        marginLeft: 10,
        marginTop: 5
    },
    messageInput: {
        height: 120
    },
    textStyle: {
        marginLeft: 15,
        marginTop: 10,
        fontWeight: 'bold'
    }
});

export default ContactForm;
