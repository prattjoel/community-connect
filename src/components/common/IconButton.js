'use-strict';

import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const IconButton = ({ name, size, style, onPress }) => {
    return (
        <TouchableOpacity
            style={style}
            onPress={onPress}
        >
            <Ionicons name={name} size={size} />
        </TouchableOpacity>
    );
};

export default IconButton;
