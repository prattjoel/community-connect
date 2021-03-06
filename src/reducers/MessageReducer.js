'use strict';

import _ from 'lodash';
import Expo from 'expo';
import {
    MESSAGE_TEXT_CHANGED,
    MESSAGE_SENT,
    GET_MESSAGE_SUCCESS,
    SET_REFRESH_STATUS,
    SET_CHAT_ROOM,
    GET_REFRESHED_MESSAGES,
    SET_LOADING,
    WEEKLY_ANNOUNCEMENT_ROOM,
    EVENT_ANNOUNCEMENT_ROOM,
    COMMUNITY_ANNOUNCEMENT_ROOM
} from '../actions/types';
import {
    PRAYER_CHAT_ROOM,
    GENERAL_CHAT_ROOM,
    SMALL_GROUP_CHAT_ROOM,
} from '../constants/chatRoomTypes';

const initialState = {
    messageText: '',
    prayer_chat_room: [],
    general_chat_room: [],
    small_group_chat_room: [],
    weekly_announcement_room: [],
    event_announcement_room: [],
    community_announcement_room: [],
    messagesToShow: [],
    refreshedMessages: [],
    isRefreshing: false,
    currentChatRoom: '',
    canLoadOlderMessages: false,
    isScrolling: true,
    isLoadingMessages: true,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case MESSAGE_TEXT_CHANGED:
            return { ...state, messageText: action.payload };
        case MESSAGE_SENT:
            return { ...state, messageText: '' };
        case SET_REFRESH_STATUS:
            return { ...state, isRefreshing: action.payload };
        case SET_LOADING:
            return { ...state, isLoadingMessages: action.payload };
        // case SET_SCROLLING:
        //     return { ...state, isScrolling: action.payload };
        case SET_CHAT_ROOM:
        // debugger;
            {
            const messagesForRoom = getMessagesFromCurrentRoom(action.payload, state);
            return { ...state,
                currentChatRoom: action.payload,
                messagesToShow: messagesForRoom
            };
            }
        case GET_MESSAGE_SUCCESS:
        // debugger;
            {
                const messagesInRoom = state[action.currentChatRoom];
                const messages = prepareMessagesForState(
                    action.payload, messagesInRoom, action.isRefreshing
                );
                const maxMessages = 20;
                if (messages.length === maxMessages) {
                    // debugger;
                    const newState = { ...state, messagesToShow: messages, isLoadingMessages: false };
                    newState[action.currentChatRoom] = messages;
                    return newState;
                }
                const newState = { ...state, messagesToShow: messages };
                newState[action.currentChatRoom] = messages;
                return newState;
            }
        case GET_REFRESHED_MESSAGES:
        // debugger;
            {
                const newRefreshedMessages = prepareMessagesForState(
                    action.payload, state.refreshedMessages
                );
                const maxMessagesFromRefresh = 10;
                if (newRefreshedMessages.length === maxMessagesFromRefresh) {
                    const refreshedState = mergeRefreshedMessages(
                        state,
                        action.currentChatRoom,
                        newRefreshedMessages
                    );
                    return refreshedState;
                }
                return {
                    ...state,
                    refreshedMessages: newRefreshedMessages, isLoadingMessages: true, isRefreshing: true
                };
            }
        default:
            return (state);
    }
};

const prepareMessagesForState = (newMessage, currentMessages) => {
    const messageToAdd = [newMessage];
    // if (isRefreshing) {
    //     const refreshedMessages = [...currentMessages, ...messageToAdd];
    //     return refreshedMessages;
    // } else
    if (!_.isEmpty(currentMessages)) {
        const updatedMessages = [...messageToAdd, ...currentMessages];
        return updatedMessages;
    }
    const firstMessage = [newMessage];
    return firstMessage;
};

// const prepareRefreshedMessages = (newMessage, currentMessages) => {
//         const messageToAdd = [newMessage];
// };

const getMessagesFromCurrentRoom = (currentRoom, state) => {
    switch (currentRoom) {
        case PRAYER_CHAT_ROOM:
            return state.prayer_chat_room;
        case GENERAL_CHAT_ROOM:
            return state.general_chat_room;
        case SMALL_GROUP_CHAT_ROOM:
            return state.small_group_chat_room;
        case WEEKLY_ANNOUNCEMENT_ROOM:
          return state.weekly_announcement_room;
        case EVENT_ANNOUNCEMENT_ROOM:
          return state.event_announcement_room;
        case COMMUNITY_ANNOUNCEMENT_ROOM:
          return state.community_announcement_room;
        default:
            return [];
    }
};

const mergeRefreshedMessages = (state, currentChatRoom, newMessages) => {
    const currentMessages = state[currentChatRoom];
    const updatedMessages = [
        ...currentMessages,
        ...newMessages
    ];
    const refreshedState = {
        ...state,
        messagesToShow: updatedMessages,
        refreshedMessages: [],
        isScrolling: false,
        isRefreshing: false,
        isLoadingMessages: false,
    };
    refreshedState[currentChatRoom] = updatedMessages;
    return refreshedState;
};
