import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authStart = () => ({
  type: actionTypes.AUTH_START
});

export const authSuccess = (idToken, userId) => ({
  type: actionTypes.AUTH_SUCCESS,
  payload: {
    idToken,
    userId
  }
});

export const authFail = error => ({
  type: actionTypes.AUTH_FAIL,
  payload: {
    error
  }
});

// * async request
export const auth = (email, password, isSignup) => {
  return dispatch => {
    // ... user authentication
    dispatch(authStart());
    const authData = {
      email,
      password,
      returnSecureToken: true
    };

    let url =
      isSignup === true
        ? 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDYNNbzIMtQNINkGmQYQM9B3iz4PeqDYjQ'
        : 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDYNNbzIMtQNINkGmQYQM9B3iz4PeqDYjQ';

    // console.log(url);
    axios
      .post(url, authData)
      .then(response => {
        // console.log(response);
        dispatch(authSuccess(response.data.idToken, response.data.localId));
      })
      .catch(err => {
        console.log(err);
        dispatch(authFail(err.response.data.error));
      });
  };
};
