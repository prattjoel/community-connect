'use strict';
import {
    SET_NAME_TEXT
} from '../actions/types';

const initialState = {
  nameText: ''
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_NAME_TEXT:
    // debugger;
      return { ...state, nameText: action.payload };
    default:
      return (state);
  }
};
