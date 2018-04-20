'use strict';
import firebase from 'firebase';
import {
  SET_NAME_TEXT,
  SET_EMAIL_TEXT,
  SET_MESSAGE_TEXT,
  SEND_CONTACT_INFO
} from './types';

export const setNameText = text => {
  return ({
    type: SET_NAME_TEXT,
    payload: text
  });
};

export const setEmailText = text => {
  return ({
    type: SET_EMAIL_TEXT,
    payload: text
  });
};

export const setMessageText = text => {
  return ({
    type: SET_MESSAGE_TEXT,
    payload: text
  });
};

export const sendContactInfo = (contactInfo) => {
    return async (dispatch) => {
        const { currentUser } = firebase.auth();
        const userID = currentUser.uid;
        const infoToSend = { ...contactInfo, user: userID };
        // console.log(currentUser);
        const action = {
            type: SEND_CONTACT_INFO,
            payload: infoToSend
        };
        await firebase.database().ref('/conctact_information/')
        .push(infoToSend);
        // console.log(resp);
        dispatch(action);

        // firebase.database().ref('/conctact_information/')
        // .push(infoToSend).then((resp) => {
        //     console.log(resp);
        //     dispatch(action);
        // });
    };
};
