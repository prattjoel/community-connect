'use strict';

import _ from 'lodash';
import {
    MESSAGE_TEXT_CHANGED,
    MESSAGE_SENT,
    GET_MESSAGE_SUCCESS,
    SET_REFRESH_STATUS,
    SET_CHAT_ROOM
} from '../actions/types';

const initialState = {
    messageText: '',
    messagesToShow: {},
    refreshedMessages: [],
    isRefreshing: false,
    currentChatRoom: ''
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
        case SET_CHAT_ROOM:
            // debugger;
            return { ...state, currentChatRoom: action.payload };
        case GET_MESSAGE_SUCCESS:
        // debugger;
        {
            const chatRoom = state.currentChatRoom;
            const currentMessages = state.messagesToShow;
            if (!_.isEmpty(currentMessages)) {
                const message = [action.payload];
                if (state.isRefreshing) {
                    // debugger;
                    const updatedMessages = state.refreshedMessages;
                    const refreshedMessages = [...message, ...updatedMessages];
                    return { ...state, refreshedMessages };
                }
                const currentMessageArray = currentMessages[chatRoom];
                const newMessages = {};
                newMessages[chatRoom] = [...message, ...currentMessageArray];
                return { ...state, messagesToShow: newMessages };
                // debugger;
                // newMessages.unshift(action.payload);
            }
            const firstMessage = {};
            firstMessage[chatRoom] = [action.payload];
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
