'use-strict';

import React from 'react';
import {
    Text,
    View,
    Linking
} from 'react-native';

import Button from './common/Button';

const Giving = () => {
    const givingLink = (
        // <View style={styles.containerStyle}>
        //     <Text
        //         onPress={openGivingUrl}
        //         style={styles.givingLinkStyle}
        //     >
        //             Give
        //     </Text>
        // </View>
        <View style={styles.containerStyle}>
            <Button
                onPress={openGivingUrl}
                style={{ alignSelf: 'center' }}
            >
                Give
            </Button>
        </View>
    );
  return givingLink;
};

const givingUrl = 'http://www.newdaychurch.nyc/contribute/';

const openGivingUrl = () => {
    Linking.openURL(givingUrl);
};

export default Giving;

const styles = {
    containerStyle: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        flexDirection: 'row'
    },
    givingLinkStyle: {
        fontSize: 46
    }
};
