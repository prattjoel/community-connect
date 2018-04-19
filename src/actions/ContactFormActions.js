'use strict';
// import firebase from 'firebase';
import {
  SET_NAME_TEXT
} from './types';

export const setNameText = text => {
  return ({
    type: SET_NAME_TEXT,
    payload: text
  });
};
