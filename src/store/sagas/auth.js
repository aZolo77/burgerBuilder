import { put, delay } from 'redux-saga/effects';
import axios from 'axios';

import * as actions from '../actions';

// * redux Saga is based on function Generators
export function* logoutSaga(action) {
  yield localStorage.removeItem('token');
  yield localStorage.removeItem('expirationDate');
  yield localStorage.removeItem('userId');
  yield put(actions.logoutSucceed());
}

export function* checkAuthTimeoutSaga(action) {
  yield delay(action.expirationTime * 1000);
  yield put(actions.logout());
}

export function* authUserSaga(action) {
  yield put(actions.authStart());
  const authData = {
    email: action.email,
    password: action.password,
    returnSecureToken: true
  };

  let url =
    action.isSignup === true
      ? 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDYNNbzIMtQNINkGmQYQM9B3iz4PeqDYjQ'
      : 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDYNNbzIMtQNINkGmQYQM9B3iz4PeqDYjQ';

  try {
    const response = yield axios.post(url, authData);
    const { data } = response;

    const expirationDate = yield new Date(
      new Date().getTime() + data.expiresIn * 1000
    );
    yield localStorage.setItem('token', data.idToken);
    yield localStorage.setItem('expirationDate', expirationDate);
    yield localStorage.setItem('userId', data.localId);

    yield put(actions.authSuccess(data.idToken, data.localId));
    yield put(actions.checkAuthTimeout(data.expiresIn));
  } catch (error) {
    yield put(actions.authFail(error.response.data.error));
  }
}

export function* authCheckStateSaga(action) {
  const token = yield localStorage.getItem('token');
  if (!token) {
    yield put(actions.logout());
  } else {
    const expDate = yield new Date(localStorage.getItem('expirationDate'));
    if (expDate <= new Date()) {
      yield put(actions.logout());
    } else {
      const userId = yield localStorage.getItem('userId');
      yield put(actions.authSuccess(token, userId));
      yield put(
        actions.checkAuthTimeout(
          (expDate.getTime() - new Date().getTime()) / 1000
        )
      );
    }
  }
}
