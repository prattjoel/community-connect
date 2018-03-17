'use-strict';

import React, { Component } from 'react';
import {
    FlatList,
    Image,
    View,
    TouchableHighlight,
    Text
} from 'react-native';

export default class PhotoList extends Component {

    componentWillReceiveProps(nextProps) {
        console.log('PhotoList: currentImages after selection made');
        console.log(this.props.currentImages);
        console.log('nextProps');
        console.log(nextProps);
    }

    onPress = (item) => {
        // console.log('image pressed');
        // console.log('current images onPress');
        // console.log(this.props.currentImages);
        // console.log(this.props.selectedImages);
        // const imageInfo = {
        //     uri: item.node.image.uri,
        //     filename: item.node.image.filename,
        //     opacity: 0.5
        // };

        this.props.selectImageToSend(item);
    }

    keyExtractor = (item) => {
        return item.filename;
    }

    highlightImage = (item) => {
        // debugger;
        // console.log(this.props.selectedImage);
        if (item.filename === this.props.selectedImage.filename
            && this.props.selectedImage.isSelected) {
                const selectedStyle = { opacity: 0.5 };
                return selectedStyle;
        }
        const notSelectedStyle = { opacity: 1.0 };
        return notSelectedStyle;
        // const opacityValue = (item.isSelected ? 0.5 : 1.0);
        // // const newStyle = { ...styles.imageStyle, opacity: opacityValue };
        // const newStyle = { opacity: opacityValue };
        // return newStyle;
        // const index = this.props.selectedImages.map((image) => image.filename)
        // .indexOf(item.filename);
        //
        // if (index !== -1) {
        //     return 0.5;
        // }
        // return 1;
    }

    showSelected = (item) => {
        if (item.filename === this.props.selectedImage.filename
            && this.props.selectedImage.isSelected) {
            return (
                <Text style={styles.selectedStyle}>
                    Selected
                </Text>
            );
        }
    }

    renderItem = ({ item }) => {
        // debugger;
        // const updatedStyle = this.highlightImage(item);
        return (

                <TouchableHighlight
                    onPress={this.onPress.bind(this, item)}
            // style={{ borderWidth: 2, borderColor: 'red', opacity: this.highlightImage(item) }}
                    style={this.highlightImage(item)}

                    // activeOpacity={0.5}
                >
                    <View style={{ flex: 1 }}>
                        <Image
                            source={{ uri: item.uri }}
                            // style={styles.imageStyle}
                            style={styles.imageStyle}
                        // style={{ ...styles.imageStyle, opacity: (item.isSelected ? 0.5 : 1.0) }}
                        />
                        {this.showSelected(item)}
                    </View>
                </TouchableHighlight>
            );
        }

        render() {
            return (
                <View style={{ flex: 10, paddingTop: 20 }}>
                    <FlatList
                        // style={{ flexDirection: 'column', borderWidth: 5, borderColor: 'black' }}
                        data={this.props.currentImages}
                        renderItem={this.renderItem}
                        keyExtractor={this.keyExtractor}
                        numColumns={3}
                        extraData={this.props.selectedImage}
                        // horizontal
                    />
                </View>
            );
        }
    }

    const styles = {
        imageStyle: {
            width: 100,
            height: 100,
            marginLeft: 2,
            marginTop: 2,
            // borderRadius: 5,
            // borderWidth: 1,
            // borderColor: '#979797'
        },
        selectedStyle: {
            fontSize: 16,
            color: 'white',
            position: 'absolute',
            right: 0,
            // left: 0,
            // top: 0,
            bottom: 0,
            // margin: 'auto',
            opacity: 1
        }
    };
