'use strict';
// import firebase from 'firebase';
import {
  SET_CHAT_ROOM
} from './types';

export const setChatRoom = chatRoom => {
  return ({
    type: SET_CHAT_ROOM,
    payload: chatRoom
  });
};
