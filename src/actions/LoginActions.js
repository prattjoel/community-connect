'use strict';
import {
    SIGN_IN_USER,
    LOADING
} from './types';

export const signInUser = isSignedIn => {
  return (
    {
      type: SIGN_IN_USER,
      isSignedIn
    }
  );
};

export const loading = isLoading => {
        return (
            {
                type: LOADING,
                isLoading
            }
        );
};
