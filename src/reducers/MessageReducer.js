'use strict';

import _ from 'lodash';
import {
    MESSAGE_TEXT_CHANGED,
    MESSAGE_SENT,
    // GET_MESSAGE_SUCCESS,
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
            {
            const messagesForRoom = getMessagesFromCurrentRoom(action.payload, state);
            return { ...state,
                currentChatRoom: action.payload,
                messagesToShow: messagesForRoom
            };
            }

        case PRAYER_CHAT_ROOM:
            // debugger;
            {
            const prayerMessages = prepareMessagesForState(action.payload, state.prayerMessages);
            return { ...state, messagesToShow: prayerMessages, prayerMessages };
            }
        case GENERAL_CHAT_ROOM:
            // debugger;
            {
            const generalMessages = prepareMessagesForState(action.payload, state.generalMessages);
            return { ...state, messagesToShow: generalMessages, generalMessages };
            }
        case SMALL_GROUP_CHAT_ROOM:
            {
            const smallGroupMessages = prepareMessagesForState(
                action.payload, state.smallGroupMessages
            );
            return { ...state, messagesToShow: smallGroupMessages, smallGroupMessages };
            }

        default:
            return (state);

        // case GET_MESSAGE_SUCCESS:
        // debugger;
        // {
        //     const chatRoom = state.currentChatRoom;
        //     const currentMessages = state.messagesToShow[chatRoom];
        //     if (!_.isEmpty(currentMessages)) {
        //         const message = [action.payload];
        //         if (state.isRefreshing) {
        //             // debugger;
        //             const updatedMessages = state.refreshedMessages;
        //             const refreshedMessages = [...message, ...updatedMessages];
        //             return { ...state, refreshedMessages };
        //         }
        //         const currentMessageArray = currentMessages[chatRoom];
        //         const newMessages = {};
        //         newMessages[chatRoom] = [...message, ...currentMessageArray];
        //         return { ...state, messagesToShow: newMessages };
        //         // debugger;
        //         // newMessages.unshift(action.payload);
        //     }
        //     const firstMessage = {};
        //     firstMessage[chatRoom] = [action.payload];
        //     return { ...state, messagesToShow: firstMessage };
        // // const currentMessagesArray = Object.keys(currentMessages);
        // // const updatedMessagesArray = Object.keys(action.payload);
        // // const currentMessageCount = currentMessagesArray.length;
        // // const updatedMessageCount = updatedMessagesArray.length;
        // // if (currentMessageCount === updatedMessageCount) {
        // //     // debugger;
        // //     return state;
        // // }
        //     // return { ...state, messagesToShow: newMessages.payload };
        // }
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

const getMessagesFromCurrentRoom = (currentRoom, state) => {
    switch (currentRoom) {
        case PRAYER_CHAT_ROOM:
            return state.prayerMessages;
        case GENERAL_CHAT_ROOM:
            return state.generalMessages;
        case SMALL_GROUP_CHAT_ROOM:
            return state.smallGroupMessages;
        default:
            return [];
    }
};
