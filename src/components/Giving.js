'use-strict';

import React from 'react';
import {
    Text,
    View,
    Linking,
    Image
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
            <View style={styles.containerStyle}>
                <Image
                  source={require('../assets/giving_image.jpeg')}
                  style={styles.imageStyle}
                />
            {/* <View style={{ ...styles.containerStyle, borderColor: 'black', borderWidth: 2 }}> */}
                {/* <Text style={styles.textStyle}>
                    We invite you into the joyful and fulfilling practice of giving at New Day.
                    You will be supporting a ministry that shares the healing love of God.
                    It’s your support that makes it possible!
                </Text> */}
            </View>
            {/* <View style={{ ...styles.containerStyle, flexDirection: 'row' }}> */}
            {/* <View style={{ ...styles.containerStyle, flexDirection: 'row', borderColor: 'blue', borderWidth: 2 }}> */}
            <View style={{ ...styles.containerStyle, justifyContent: 'flex-start', marginTop: 30 }}>
                <View style={styles.linksContainer}>
                    <Button
                        onPress={() => {
                            openGivingUrl(webGivingUrl);
                        }}
                        style={{ alignSelf: 'flex-start', borderColor: 'orange' }}
                        updatedText={{ fontSize: 28, color: 'orange' }}
                    >
                        Give Online
                    </Button>
                </View>
                <View style={styles.linksContainer}>
                    <Text style={styles.linkTextStyle}>
                        Venmo:
                    </Text>
                    <Text style={{ ...styles.linkTextStyle, marginLeft: 5, alignSelf: 'flex-start' }}>
                        @Newday-Methodist
                    </Text>

                    {/* <Button
                        onPress={() => {
                            openGivingUrl(webGivingUrl);
                        }}
                        style={{ alignSelf: 'flex-start' }}
                    >
                        Give
                    </Button> */}
                </View>
                <View style={styles.linksContainer}>
                    <Text style={styles.linkTextStyle}>
                        Cash APP:
                    </Text>
                    <Text style={{ ...styles.linkTextStyle, marginLeft: 5 }}>
                        $NEWDAYCHURCHBX
                    </Text>
                </View>
            </View>
                {/* <Button
                    onPress={() => {
                        openGivingUrl(venmoUrl);
                    }}
                    style={{ alignSelf: 'center' }}
                >
                    Venmo
                </Button> */}
            {/* </View> */}
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
    textStyle: {
        // position: 'absolute',
        marginTop: 5,
        color: 'black',
        fontSize: 16,
        fontWeight: 'bold',
        flex: 1
    },
    givingLinkStyle: {
        fontSize: 46
    },
    imageStyle: {
        flex: 1,
        resizeMode: 'contain',
        // borderWidth: 5,
        // borderColor: 'black'

        // position: 'absolute',
        // top: 0,
        // left: 0,
        // bottom: 0,
        // right: 0
    },
    linksContainer: {
        // flex: 1,
        flexDirection: 'row',
        // borderWidth: 5,
        // borderColor: 'blue',
        alignItems: 'flex-start',
        marginTop: 10
    },
    linkTextStyle: {
        fontSize: 18,
        // fontWeight: '600'
    }
};
