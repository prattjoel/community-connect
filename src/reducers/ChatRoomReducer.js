'use strict';
import {
  GET_CHAT_ROOM,
  SET_CHAT_ROOM,
  GENERAL_CHAT_ROOM,
} from '../actions/types';

const initialState = {
  currentChatRoom: GENERAL_CHAT_ROOM
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_CHAT_ROOM:
    // debugger;
      return { ...state, currentChatRoom: action.payload };
    default:
      return (state);
  }
};
