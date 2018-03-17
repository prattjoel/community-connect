'use-strict';

import React, { Component } from 'react';
import {
    Modal,
    View,
} from 'react-native';
import Button from '../common/Button';
import PhotoList from './PhotoList';

export default class ImageSelector extends Component {
    componentDidMount() {
        // debugger;
        // console.log('showImages in componentDidMount');
        // console.log(this.props.showImages);
        console.log('currentImages in componentDidMount ImageSelector: ');
        console.log(this.props.currentImages);
    }

    // componentWillReceiveProps(nextProps) {
    //     console.log('ImageSelector: currentImages after selection made');
    //     console.log(this.props.currentImages);
    //     console.log('nextProps');
    //     console.log(nextProps);
    // }

    onPressDoneButton = () => {
        if (this.props.selectedImage.isSelected) {
            // debugger;
            this.props.sendImage(this.props.selectedImage, this.props.currentChatRoom);
        }
        this.props.cancelImages();
    }
    onPressCancelButton = () => {
        this.props.cancelImages();
    }

    onShowImages = () => {
        console.log('currentImages in onShowImages of ImageSelector: ');
        console.log(this.props.currentImages);
    }

    render() {
        return (
            <Modal
                animationType="slide"
                transparent={false}
                visible={this.props.showImages}
                onShow={this.onShowImages.bind(this)}
            >
                <View style={{ flex: 1, flexDirection: 'column' }}>
                    <PhotoList
                        currentImages={this.props.currentImages}
                        selectedImage={this.props.selectedImage}
                        selectImageToSend={this.props.selectImageToSend}
                        // sendImage={this.props.sendImage}
                    />
                    <View style={{ flex: 1, flexDirection: 'row', paddingBottom: 5 }}>
                        <Button
                            onPress={this.onPressDoneButton.bind(this)}
                        >
                            Send
                        </Button>
                        <Button
                            onPress={this.onPressCancelButton.bind(this)}
                        >
                            Cancel
                        </Button>
                    </View>
                </View>
            </Modal>
            );
        }
    }
