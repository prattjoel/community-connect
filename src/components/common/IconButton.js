'use-strict';

import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const IconButton = ({ name, size, style, onPress }) => {
    return (
        <View
            style={style}
        >
            <TouchableOpacity
                onPress={onPress}
            >
                <Ionicons name={name} size={size} />
            </TouchableOpacity>
        </View>
    );
};

export default IconButton;
