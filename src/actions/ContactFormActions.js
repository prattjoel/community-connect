'use strict';
// import firebase from 'firebase';
import {
  SET_NAME_TEXT,
  SET_EMAIL_TEXT,
  SET_MESSAGE_TEXT
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
