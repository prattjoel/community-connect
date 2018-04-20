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

export const sendContactInfo = contactInfo => {
    return (dispatch) => {
        const { currentUser } = firebase.auth();
        const userID = currentUser.uid;
        // console.log(currentUser);
        const action = {
            type: SEND_CONTACT_INFO,
            payload: contactInfo
        };

        dispatch(action);

    }
};
