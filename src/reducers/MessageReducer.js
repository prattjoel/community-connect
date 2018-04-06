'use strict';
import {
    MESSAGE_TEXT_CHANGED,
    MESSAGE_SENT,
    GET_MESSAGE_SUCCESS,
    SET_REFRESH_STATUS
} from '../actions/types';

const initialState = {
    messageText: '',
    messagesToShow: [],
    refreshedMessages: [],
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
            const currentMessages = state.messagesToShow;
            if (currentMessages) {
                const message = [action.payload];
                if (state.isRefreshing) {
                    // debugger;
                    const updatedMessages = state.refreshedMessages;
                    const refreshedMessages = [...message, ...updatedMessages];
                    return { ...state, refreshedMessages };
                }
                const newMessages = [...message, ...currentMessages];
                return { ...state, messagesToShow: newMessages };
                // debugger;
                // newMessages.unshift(action.payload);
            }
            const firstMessage = [action.payload];
            return { ...state, messagesToShow: firstMessage };
        // const currentMessagesArray = Object.keys(currentMessages);
        // const updatedMessagesArray = Object.keys(action.payload);
        // const currentMessageCount = currentMessagesArray.length;
        // const updatedMessageCount = updatedMessagesArray.length;
        // if (currentMessageCount === updatedMessageCount) {
        //     // debugger;
        //     return state;
        // }
            // return { ...state, messagesToShow: newMessages.payload };
        }
        default:
            return (state);
    }
};
