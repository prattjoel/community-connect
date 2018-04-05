'use strict';
import {
    MESSAGE_TEXT_CHANGED,
    MESSAGE_SENT,
    GET_MESSAGE_SUCCESS,
    SET_REFRESH_STATUS
} from '../actions/types';

const initialState = {
    messageText: '',
    messagesToShow: {},
    isRefreshing: false
};

export default (state = initialState, action) => {
    switch (action.type) {
        case MESSAGE_TEXT_CHANGED:
            return { ...state, messageText: action.payload };
        case MESSAGE_SENT:
        // debugger;
        return { ...state, messageText: '' };
        case SET_REFRESH_STATUS:
            return { ...state, isRefreshing: action.payload };
        case GET_MESSAGE_SUCCESS:
        // debugger;
        {
            const newMessages = {};
            const currentMessages = state.messagesToShow;
            if (currentMessages) {
                newMessages.payload = { ...currentMessages, ...action.payload };
            } else {
                newMessages.payload = action.payload;
            }
        // const currentMessagesArray = Object.keys(currentMessages);
        // const updatedMessagesArray = Object.keys(action.payload);
        // const currentMessageCount = currentMessagesArray.length;
        // const updatedMessageCount = updatedMessagesArray.length;
        // if (currentMessageCount === updatedMessageCount) {
        //     // debugger;
        //     return state;
        // }
            return { ...state, messagesToShow: newMessages.payload };
        }
        default:
            return (state);
    }
};
