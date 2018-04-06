'use strict';
import firebase from 'firebase';
import {
    MESSAGE_TEXT_CHANGED,
    MESSAGE_SENT,
    GET_MESSAGE_SUCCESS,
    CHILD_ADDED,
    SET_REFRESH_STATUS
} from './types';

// Set text for message input
export const messageChanged = text => {
    return ({
        type: MESSAGE_TEXT_CHANGED,
        payload: text
    });
};

export const setRefresh = isRefreshing => {
    return {
        type: SET_REFRESH_STATUS,
        payload: !isRefreshing
    };
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
export const getMessages = (currentChatRoom, lastKey) => {
    // Supply default in case chat room is empty
    // debugger;
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
        const rootRef = firebase.database().ref();
        if (lastKey) {
            console.log('lastKey in getMessages is: ', lastKey);
            const refByKey = rootRef.child(`/chat_rooms/${currentChatRoom}`)
            .orderByKey()
            .endAt(lastKey)
            .limitToLast(10);
            // .equalTo(lastKey);
            queryDatabaseForMessages(dispatch, currentChatRoom, defaultMessage, refByKey);
        } else {
            console.log('no lastKey in getMessages');
            const refByLast = rootRef.child(`/chat_rooms/${currentChatRoom}`).limitToLast(10);

            queryDatabaseForMessages(dispatch, currentChatRoom, defaultMessage, refByLast);
        }
        // firebase.database().ref(`/chat_rooms/${currentChatRoom}`)
        // .limitToLast(10)
        // .on(CHILD_ADDED, data => {
        //     // debugger;
        //     const messageData = data.val();
        //     const message = {};
        //      message[data.key] = messageData;
        //     if (data) {
        //         // debugger;
        //         callDispatch(dispatch, message);
        //     } else {
        //         // debugger;
        //         callDispatch(dispatch, defaultMessage);
        //     }
        // });
    };
};

const queryDatabaseForMessages = (dispatch, currentChatRoom, defaultMessage, ref) => {
    // const last10 =
    // firebase.database().ref(`/chat_rooms/${currentChatRoom}`)
    ref
    .on(CHILD_ADDED, data => {
        // debugger;
        const messageData = data.val();
        const message = {};
         message[data.key] = messageData;
        if (data) {
            // debugger;
            callDispatch(dispatch, message);
        } else {
            // debugger;
            callDispatch(dispatch, defaultMessage);
        }
    });
};

const callDispatch = (dispatch, messageValue) => {
    dispatch({
        type: GET_MESSAGE_SUCCESS,
        payload: messageValue
    });
};
