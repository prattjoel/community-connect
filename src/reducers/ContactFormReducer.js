'use strict';
import {
    SET_NAME_TEXT,
    SET_EMAIL_TEXT,
    SET_MESSAGE_TEXT
} from '../actions/types';

const initialState = {
  nameText: '',
  emailText: '',
  messageText: ''
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_NAME_TEXT:
    // debugger;
      return { ...state, nameText: action.payload };
    case SET_EMAIL_TEXT:
        return { ...state, emailText: action.payload };
    case SET_MESSAGE_TEXT:
        return { ...state, messageText: action.payload };
    default:
      return (state);
  }
};
