'use-strict';

import React, { Component } from 'react';
import {
    Animated,
    Keyboard
} from 'react-native';

export default class KeyboardManager extends Component {
    constructor(props) {
        super(props);

        this.keyboardHeight = new Animated.Value(0);
    }

    componentWillMount() {
        // this.keyboardWillShow.bind(this);
        // this.keyboardWillHide.bind(this);
        this.keyboardDidShowListener = Keyboard
        .addListener('keyboardWillShow', this.keyboardWillShow);
        this.keyboardDidHideListener = Keyboard
        .addListener('keyboardWillHide', this.keyboardWillHide);
    }

    componentWillUnMount() {
        this.keyboardDidShowListener.remove();
        this.keyboardDidHideListener.remove();
        // Keyboard.dismiss();
    }

    keyboardWillShow = (event) => {
        // console.log('Keyboard Shown');
        // console.log('duration:');
        // console.log(event.duration);
        Animated.timing(
            this.keyboardHeight,
            {
                duration: event.duration,
                toValue: event.endCoordinates.height
            }
        ).start();
        // console.log('Keyboard Shown 2');
    }
    keyboardWillHide = (event) => {
        Animated.timing(
            this.keyboardHeight,
            {
                duration: event.duration,
                toValue: 0
            }
        ).start();
        // console.log('Keyboard Hidden');
    }

    render() {
        return (
            <Animated.View
                style={{ flex: 1, paddingBottom: this.keyboardHeight }}
                >
                    {this.props.children}
                </Animated.View>

            );
        }
    }
