'use strict';

import { connect } from 'react-redux';
import {
    setCurrentImages,
    toggleImageSelector,
    selectImageToSend,
    sendSelectedImages,
    cancelImages
} from '../actions/ImageActions';
import { sendMessage } from '../actions/MessageActions';
import ImageSelector from '../components/chat/ImageSelector';


const mapStateToProps = state => {
    const { currentImages, showImages, selectedImage, photoUrl } = state.imagesFromCR;
    const { currentChatRoom } = state.chatRooms;
    return (
        {
            currentImages,
            showImages,
            selectedImage,
            currentChatRoom,
            photoUrl
            // selectedImages
        }
    );
};

const mapDispatchToProps = dispatch => {
    return (
        {
            setCurrentImages: (currentImages) => {
                dispatch(setCurrentImages(currentImages));
            },
            showImageSelector: (showImages) => {
                dispatch(toggleImageSelector(showImages));
            },
            selectImageToSend: (imageToSend) => {
                dispatch(selectImageToSend(imageToSend));
            },
            sendImage: (imageToSend, currentChatRoom) => {
                dispatch(sendSelectedImages(imageToSend, currentChatRoom));
            },
            cancelImages: () => {
                dispatch(cancelImages());
            }
          //   sendMessage: (type, content, currentChatRoom) => {
          //     dispatch(sendMessage(type, content, currentChatRoom));
          // }
        }
    );
};

const ImagesFromCR = connect(
    mapStateToProps,
    mapDispatchToProps
)(ImageSelector);

export default ImagesFromCR;
