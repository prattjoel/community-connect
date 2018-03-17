'use strict';
import {
    SIGN_IN_USER,
    LOADING
} from '../actions/types';

const initialState = {
    isSignedIn: false, isLoading: false
};

const signIn = (state = initialState, action) => {
    // console.log('signIn reducer called');
    // debugger;
    switch (action.type) {
        case SIGN_IN_USER:
        // console.log('state for SIGN_IN_USER set');
        // console.log('action called');
        // console.log(action.isSignedIn);
            return ({ ...state, isSignedIn: action.isSignedIn });
        case LOADING:
            return ({ ...state, isLoading: action.isLoading });
        default:
        // console.log('default state returned');
        // console.log(state);
        return state;
    }
};

export default signIn;
