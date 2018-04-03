'use strict';
import firebase from 'firebase';
import {
    MESSAGE_TEXT_CHANGED,
    MESSAGE_SENT,
    GET_MESSAGE_SUCCESS
} from './types';

// Set text for message input
export const messageChanged = text => {
    return ({
        type: MESSAGE_TEXT_CHANGED,
        payload: text
    });
};

// Create and send message to database
export const sendMessage = (type, content, currentChatRoom) => {
    return (dispatch) => {
        const { currentUser } = firebase.auth();
        const userID = currentUser.uid;
        firebase.database().ref(`/users/${userID}`).once('value', snapshot => {
            const userInfo = snapshot.val();
            const messageInfo = prepareMessageToSend(type, content, userInfo, userID);
            const action = { type: MESSAGE_SENT };

            sendMessageToDatabase(dispatch, messageInfo, currentChatRoom, action);
        })
        .catch((error) => {
            console.log('error sending message from sendMessage', error);
        });
    };
};

// Creat message object to send to database
export const prepareMessageToSend = (type, content, userInfo, id) => {
    const timeOptions = { hour: 'numeric', minute: 'numeric' };
    const date = new Date();
    const timestamp = date.toLocaleTimeString('en-us', timeOptions);

    if (userInfo) {
        const { name, profilePicUrl } = userInfo;
        const messageInfo = {
            user: id,
            timestamp,
            name,
            profilePhotoUrl: profilePicUrl
        };
        messageInfo[type] = content;
        return messageInfo;
    } else {
        console.log('no user in sendMessage');
    }
};

// Send created message to database
export const sendMessageToDatabase = (dispatch, messageInfo, currentChatRoom, action) => {
    // return () => {
    firebase.database().ref(`/chat_rooms/${currentChatRoom}`)
    .push(messageInfo)
    .then(() => {
        // debugger;
        console.log('message sent');
        dispatch(action);
    });
    // };
};

// Retrieve messages from database based on the current chat room.
export const getMessages = (currentChatRoom) => {
    // Supply default in case chat room is empty
    const defaultMessage = {
        key: {
            message: 'default message',
            name: 'name',
            timestamp: '00:00',
            user: 'default user'
        }
    };

    return (dispatch) => {
        // debugger;
        firebase.database().ref(`/chat_rooms/${currentChatRoom}`)
        .limitToLast(10)
        .on('value', snapshot => {
            // debugger;
            const snap = snapshot.val();
            if (snap) {
                // debugger;
                callDispatch(dispatch, snap);
            } else {
                // debugger;
                callDispatch(dispatch, defaultMessage);
            }
        });
    };
};

const callDispatch = (dispatch, messageValue) => {
    dispatch({
        type: GET_MESSAGE_SUCCESS,
        payload: messageValue
    });
};
