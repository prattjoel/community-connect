'use strict';

import {
    SET_CURRENT_IMAGES,
    SHOW_IMAGE_SELECTOR,
    SELECT_IMAGE_TO_SEND,
    IMAGE_UPLOADED,
    CANCEL_IMAGE_SELECTION
    // UNSELECT_IMAGE_TO_SEND
} from '../constants/ImageTypes';

const initialState = {
    currentImages: [],
    showImages: false,
    selectedImage: {},
    photoUrl: ''
};

export default (state = initialState, action) => {
    // debugger;
    switch (action.type) {
        case SET_CURRENT_IMAGES:
            return { ...state, currentImages: action.payload };
        case SHOW_IMAGE_SELECTOR:
        // console.log('showImages');
        // console.log(action.payload);
            return { ...state, showImages: action.payload };
        case SELECT_IMAGE_TO_SEND:
        // TODO: DONE
        // 1. restructure reducer to reflect single image selection.
        // 2. enable unselecting
        // debugger;
            {
                const index = state.currentImages.map((image) => image.filename)
                .indexOf(action.payload.filename);
                if (index === -1) {
                    return state;
                }
                    const updatedImages = state.currentImages.map((image) => {
                        const currentImage = image;
                        currentImage.isSelected = false;
                        return currentImage;
                    });
                    updatedImages[index] = action.payload;
                    return {
                        ...state,
                        currentImages: updatedImages,
                        selectedImage: action.payload
                    };
            }
        case IMAGE_UPLOADED:
            // debugger;
            return { ...initialState, photoUrl: action.payload };
        case CANCEL_IMAGE_SELECTION:
            return initialState;
        default:
            return state;
    }
};
