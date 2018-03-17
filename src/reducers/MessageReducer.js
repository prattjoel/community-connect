'use strict';
import {
  MESSAGE_TEXT_CHANGED,
  MESSAGE_SENT,
  GET_MESSAGE_SUCCESS
} from '../actions/types';

const initialState = {
  messageText: '',
  messagesToShow: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case MESSAGE_TEXT_CHANGED:
      return { ...state, messageText: action.payload };
    case MESSAGE_SENT:
      return { ...state, messageText: '' };
    case GET_MESSAGE_SUCCESS:
      return { ...state, messagesToShow: action.payload };
    default:
      return (state);
  }
};
