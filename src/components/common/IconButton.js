'use-strict';

import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const IconButton = ({ name, size }) => {
    return (
        <TouchableOpacity style={{ flex: 1 }}>
            <Ionicons name={name} size={size} />
        </TouchableOpacity>
    );
};

export default IconButton;
