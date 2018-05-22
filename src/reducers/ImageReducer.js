'use strict';

import {
    SET_CURRENT_IMAGES,
    SHOW_IMAGE_SELECTOR,
    SELECT_IMAGE_TO_SEND,
    IMAGE_UPLOADED,
    CANCEL_IMAGE_SELECTION,
    SHOW_IMAGE_DETAIL,
    SET_IMAGE_DETAIL_INFO,
    SET_IMAGE_DETAIL_SIZE
    // UNSELECT_IMAGE_TO_SEND
} from '../constants/ImageTypes';

const initialState = {
    currentImages: [],
    showImages: false,
    selectedImage: {},
    photoUrl: '',
    showImageDetail: false,
    imageDetailUrl: '',
    imageDetailInfo: {},
    imageDetailSize: {},
    isLandscape: true
};

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_CURRENT_IMAGES:
            return { ...state, currentImages: action.payload };
        case SHOW_IMAGE_SELECTOR:
            return { ...state, showImages: action.payload };
        case SET_IMAGE_DETAIL_INFO:
            return { ...state, imageDetailInfo: action.payload };
        case SET_IMAGE_DETAIL_SIZE:
            return { ...state, imageDetailSize: action.payload, isLandscape: action.isLandscape };
        case SELECT_IMAGE_TO_SEND:
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
        case SHOW_IMAGE_DETAIL:
          return { ...state, showImageDetail: action.payload };
        default:
            return state;
    }
};
