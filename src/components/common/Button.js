'use-strict';

import React from 'react';
import {
  TouchableOpacity,
  Text
} from 'react-native';

const Button = ({ children, onPress, style, updatedText }) => {
  return (
     <TouchableOpacity onPress={onPress} style={{ ...styles.buttonStyle, ...style }}>
       <Text style={{ ...styles.textStyle, ...updatedText }}>
         {children}
       </Text>
     </TouchableOpacity>
   );
};

const styles = {
  textStyle: {
    alignSelf: 'center',
    color: '#007aff',
    fontSize: 16,
    fontWeight: '600',
    paddingTop: 10,
    paddingBottom: 10
  },
  buttonStyle: {
    flex: 1,
    // height: 50,
    alignSelf: 'flex-end',
    backgroundColor: '#fff',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#007aff',
    marginLeft: 5,
    marginRight: 5
  }
};

export default Button;
