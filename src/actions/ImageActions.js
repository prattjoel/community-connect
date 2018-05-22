'use strict';

import { RNS3 } from 'react-native-aws3';
import firebase from 'firebase';
// import { Image } from 'react-native';
// import Config from 'react-native-config';
import {
    SET_CURRENT_IMAGES,
    SHOW_IMAGE_SELECTOR,
    SELECT_IMAGE_TO_SEND,
    IMAGE_UPLOADED,
    CANCEL_IMAGE_SELECTION,
    SHOW_IMAGE_DETAIL,
    SET_IMAGE_DETAIL_INFO,
    SET_IMAGE_DETAIL_SIZE
} from '../constants/ImageTypes';
import {
    prepareMessageToSend,
    sendMessageToDatabase
} from './MessageActions';
import {
    KEY,
    SECRET
} from '../constants/KeysToTheKingdom';

export const setCurrentImages = imagesFromCameraRoll => {
    const currentImages = imagesFromCameraRoll
    .map(imageInfo => {
      const { uri, filename, height, width } = imageInfo.node.image;
        return {
            uri,
            filename,
            height,
            width,
            isSelected: false
        };
    });
    // debugger;
    return ({
        type: SET_CURRENT_IMAGES,
        payload: currentImages
    });
};

export const toggleImageSelector = showImageSelector => {
    return (
        {
            type: SHOW_IMAGE_SELECTOR,
            payload: showImageSelector
        }
    );
};

export const setImageDetailInfo = (imageDetailUrl, imageDetailHeight, imageDetailwidth) => {
  return {
    type: SET_IMAGE_DETAIL_INFO,
    payload: { photoUrl: imageDetailUrl, height: imageDetailHeight, width: imageDetailwidth }
  };
};

export const setImageDetailSize = (imageSize, isLandscape) => {
  return {
    type: SET_IMAGE_DETAIL_SIZE,
    isLandscape,
    payload: imageSize
  };
};

export const selectImageToSend = imageToSend => {
    const updatedImage = { ...imageToSend, isSelected: !imageToSend.isSelected };
    return (
        {
            type: SELECT_IMAGE_TO_SEND,
            payload: updatedImage
        }
    );
};

export const cancelImages = () => {
    return (
        {
            type: CANCEL_IMAGE_SELECTION
        }
    );
};

export const toggleImageDetail = (showImageDetail) => {
  return ({
    type: SHOW_IMAGE_DETAIL,
    payload: showImageDetail
  });
};

// debugger;
// const key = Config.ACCESS_KEY;
// console.log(key);
// const secret = Config.ACCESS_SECRET;
// console.log(secret);
// debugger;
const imageOptions = {
    keyPrefix: 'message_images/',
    bucket: 'community-connect-image-store',
    region: 'us-east-2',
    accessKey: KEY,
    secretKey: SECRET,
    successActionStatus: 201
};

export const sendSelectedImages = (selectedImages, currentChatRoom) => {
    // debugger;
    const imageToSend = prepareImageToSend(selectedImages);
    return (dispatch) => {
        sendImage(dispatch, imageToSend, currentChatRoom);
    };
};

const sendImage = (dispatch, imageFile, currentChatRoom) => {
    // debugger;

    RNS3.put(imageFile, imageOptions).then(response => {
        if (response.status !== 201) {
            console.log(response);
            throw new Error('Image upload failed');
        } else {
            // console.log('response from sending image');
            // console.log(response);
            // console.log('image url:');
            // console.log(response.body.postResponse.location);
            const photoUrl = response.body.postResponse.location;
            return photoUrl;
        }
    }).then(photoUrl => {
        const { currentUser } = firebase.auth();
        const userID = currentUser.uid;
        firebase.database().ref(`/users/${userID}`).once('value', snapshot => {
            const userInfo = snapshot.val();

            const messageInfo = prepareMessageToSend('photoUrl', photoUrl, userInfo, userID);
            const photoMessageInfo = { ...messageInfo, height: imageFile.height, width: imageFile.width };
            const action = {
                type: IMAGE_UPLOADED,
                payload: photoUrl };
                sendMessageToDatabase(dispatch, photoMessageInfo, currentChatRoom, action);
            })
            .catch((error) => {
                console.log('error sending image from sendImage', error);
            });
        });
    };

    const prepareImageToSend = imageToPrepare => {
        const preparedImage = {
            uri: imageToPrepare.uri,
            name: imageToPrepare.filename,
            height: imageToPrepare.height,
            width: imageToPrepare.width,
            type: 'image/png'
        };
        return preparedImage;
    };
