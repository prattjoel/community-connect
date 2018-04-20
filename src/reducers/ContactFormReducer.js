'use strict';
import {
    SET_NAME_TEXT,
    SET_EMAIL_TEXT,
    SET_MESSAGE_TEXT,
    SEND_CONTACT_INFO
} from '../actions/types';

const initialState = {
  nameText: '',
  emailText: '',
  messageText: '',
  contactInfo: {},
  contactInfoSent: false
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
    case SEND_CONTACT_INFO:
        return { ...state, ...initialState, contactInfoSent: true };
    default:
      return (state);
  }
};
