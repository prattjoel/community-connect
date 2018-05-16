'use strict';
import firebase from 'firebase';
import {
    MESSAGE_TEXT_CHANGED,
    MESSAGE_SENT,
    GET_MESSAGE_SUCCESS,
    CHILD_ADDED,
    SET_REFRESH_STATUS,
    GET_REFRESHED_MESSAGES,
    SET_LOADING,
    // SET_CAN_LOAD,
    // SET_SCROLLING
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

// export const setCanLoadOlderMessages = canLoad => {
//     return {
//         type: SET_CAN_LOAD,
//         payload: !canLoad
//     };
// };

export const setIsLoading = isLoading => {
    return {
        type: SET_LOADING,
        payload: isLoading
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
    // debugger;
    const timestamp = Date.now();
    const date = new Date();
    const timeToShow = date.toLocaleTimeString('en-us', timeOptions);
    // const timestamp = date.toLocaleTimeString('en-us', timeOptions);

    if (userInfo) {
        const { name, profilePicUrl } = userInfo;
        const messageInfo = {
            user: id,
            timestamp,
            timeToShow,
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
    // debugger;
    firebase.database().ref(`/chat_rooms/${currentChatRoom}`)
    .push(messageInfo)
    .then(() => {
        // debugger;
        console.log('message sent');
        dispatch(action);
    });
    // };
};

export const refreshMessages = (currentChatRoom, messages) => {
    // debugger;
    return (dispatch) => {
        const defaultMessage = {
            key: {
                message: 'default message',
                name: 'name',
                timestamp: '00:00',
                user: 'default user'
            }
        };
        // debugger;
        const hourInMiliseconds = 3600000;
        const lastMessage = messages[messages.length - 1];
        const messageInfo = Object.values(lastMessage)[0];
        const key = Object.keys(lastMessage)[0];
        const lastTimestamp = messageInfo.timestamp;
        const timeForQueryEnd = (lastTimestamp - 1000);
        const timeForQueryStart = (lastTimestamp - hourInMiliseconds);

        const rootRef = firebase.database().ref();
        const refByTime = rootRef.child(`/chat_rooms/${currentChatRoom}`)
        .orderByChild('timestamp')
        // .startAt(timeForQueryStart)
        .endAt(timeForQueryEnd)
         // .limitToFirst(10);
        .limitToLast(10);
        // .equalTo(lastKey);
        queryDatabaseForMessages(dispatch, currentChatRoom, defaultMessage, refByTime, true);
    };
};

// Retrieve messages from database based on the current chat room.
export const getMessages = (currentChatRoom, lastTimeStamp) => {
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
        if (lastTimeStamp) {
            const time = time - 1;
            console.log('lastTime in getMessages is: ', time);
            const refByKey = rootRef.child(`/chat_rooms/${currentChatRoom}`)
            .orderByKey()
            .endAt(time)
            .limitToLast(10);
            // .equalTo(lastKey);
            queryDatabaseForMessages(dispatch, currentChatRoom, defaultMessage, refByKey);
        } else {
            console.log('no lastKey in getMessages');
            const refByLast = rootRef.child(`/chat_rooms/${currentChatRoom}`).limitToLast(20);

            queryDatabaseForMessages(dispatch, currentChatRoom, defaultMessage, refByLast, false);
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

const queryDatabaseForMessages = (dispatch, currentChatRoom, defaultMessage, ref, isRefreshing) => {
    // const last10 =
    // firebase.database().ref(`/chat_rooms/${currentChatRoom}`)
    ref
    .on(CHILD_ADDED, data => {
        if (data) {
            // debugger;
            const messageData = data.val();
            const message = {};
            // const key = data.key;
             message[data.key] = messageData;
             // const messageInfo = message[key];
             // const time = messageInfo.timestamp;
             // // debugger;
             // if (Number.isInteger(time)) {
             //     const date = new Date(time);
             //     const timeOptions = { hour: 'numeric', minute: 'numeric' };
             //     const updatedTime = date.toLocaleTimeString('en-us', timeOptions);
             //     // const updatedMessage = { ...message, timestamp: updatedTime };
             //     message[key].timestamp = updatedTime;
             //     callDispatch(dispatch, message, currentChatRoom);
             // } else {
             //     callDispatch(dispatch, message, currentChatRoom);
             // }
             callDispatch(dispatch, message, currentChatRoom, isRefreshing);
        } else {
            // debugger;
            callDispatch(dispatch, defaultMessage, currentChatRoom, isRefreshing);
        }
    });
};

const callDispatch = (dispatch, messageValue, currentChatRoom, isRefreshing) => {
    // debugger;
    const type = (isRefreshing ? GET_REFRESHED_MESSAGES : GET_MESSAGE_SUCCESS);
    dispatch({
        type,
        currentChatRoom,
        isRefreshing,
        payload: messageValue
    });
};
