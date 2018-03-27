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
            <View style={{ ...styles.containerStyle }}>
            {/* <View style={{ ...styles.containerStyle, borderColor: 'black', borderWidth: 2 }}> */}
                <Text>
                    We invite you into the joyful and fulfilling practice of giving at New Day.
                    You will be supporting a ministry that shares the healing love of God.
                    It’s your support that makes it possible!
                </Text>
            </View>
            <View style={{ ...styles.containerStyle, flexDirection: 'row' }}>
            {/* <View style={{ ...styles.containerStyle, flexDirection: 'row', borderColor: 'blue', borderWidth: 2 }}> */}

                <Button
                    onPress={() => {
                        openGivingUrl(webGivingUrl);
                    }}
                    style={{ alignSelf: 'center' }}
                >
                    Give
                </Button>
                <Button
                    onPress={() => {
                        openGivingUrl(venmoUrl);
                    }}
                    style={{ alignSelf: 'center' }}
                >
                    Venmo
                </Button>
            </View>
        </View>
    );
  return givingLink;
};

const webGivingUrl = 'http://www.newdaychurch.nyc/contribute/';
const venmoUrl = 'https://venmo.com/';

const openGivingUrl = (url) => {
    Linking.openURL(url);
};

export default Giving;

const styles = {
    containerStyle: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        // flexDirection: 'row'
    },
    givingLinkStyle: {
        fontSize: 46
    }
};
