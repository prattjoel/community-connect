'use strict';

import _ from 'lodash';
import {
    MESSAGE_TEXT_CHANGED,
    MESSAGE_SENT,
    GET_MESSAGE_SUCCESS,
    SET_REFRESH_STATUS,
    SET_CHAT_ROOM
} from '../actions/types';
import {
    PRAYER_CHAT_ROOM,
    GENERAL_CHAT_ROOM,
    SMALL_GROUP_CHAT_ROOM,
} from '../constants/chatRoomTypes';

const initialState = {
    messageText: '',
    prayerMessages: [],
    generalMessages: [],
    smallGroupMessages: [],
    messagesToShow: [],
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
        case PRAYER_CHAT_ROOM:
            // debugger;
            {
            const currentMessages = prepareMessagesForState(action.payload, state.prayerMessages);
            return { ...state, messagesToShow: currentMessages, prayerMessages: currentMessages };
            }
        case GET_MESSAGE_SUCCESS:
        debugger;
        {
            const chatRoom = state.currentChatRoom;
            const currentMessages = state.messagesToShow[chatRoom];
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

const prepareMessagesForState = (newMessage, currentMessages) => {
    if (!_.isEmpty(currentMessages)) {
        const messageToAdd = [newMessage];
        const updatedMessages = [...messageToAdd, ...currentMessages];
        return updatedMessages;
    }
    const firstMessage = [newMessage];
    return firstMessage;
};
