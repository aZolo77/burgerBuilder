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

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('expirationDate');
  localStorage.removeItem('userId');
  return {
    type: actionTypes.AUTH_LOGOUT
  };
};

export const setAuthRedirectPath = path => {
  return {
    type: actionTypes.SET_AUTH_REDIRECT_PATH,
    payload: {
      path
    }
  };
};

export const authCheckState = () => {
  return dispatch => {
    const token = localStorage.getItem('token');
    if (!token) {
      dispatch(logout());
    } else {
      const expDate = new Date(localStorage.getItem('expirationDate'));
      if (expDate <= new Date()) {
        dispatch(logout());
      } else {
        const userId = localStorage.getItem('userId');
        dispatch(authSuccess(token, userId));
        dispatch(
          checkAuthTimeout((expDate.getTime() - new Date().getTime()) / 1000)
        );
      }
    }
  };
};

// * async requests
export const checkAuthTimeout = expirationTime => {
  return dispatch => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationTime * 1000);
  };
};

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
      .then(({ data }) => {
        // console.log(response);
        const expirationDate = new Date(
          new Date().getTime() + data.expiresIn * 1000
        );
        localStorage.setItem('token', data.idToken);
        localStorage.setItem('expirationDate', expirationDate);
        localStorage.setItem('userId', data.localId);
        dispatch(authSuccess(data.idToken, data.localId));
        dispatch(checkAuthTimeout(data.expiresIn));
      })
      .catch(err => {
        console.log(err);
        dispatch(authFail(err.response.data.error));
      });
  };
};
