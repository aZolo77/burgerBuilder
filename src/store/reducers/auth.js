import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
  idToken: null,
  userId: null,
  error: null,
  loading: false,
  authRedirectPath: '/'
};

const authStart = (state, payload) =>
  updateObject(state, { loading: true, error: null });

const authSucccess = (state, payload) => {
  return updateObject(state, {
    idToken: payload.idToken,
    userId: payload.userId,
    loading: false,
    error: null
  });
};

const authLogout = (state, payload) => {
  return updateObject(state, {
    idToken: null,
    userId: null,
    loading: false,
    error: null
  });
};

const setAuthRedirectPath = (state, payload) => {
  return updateObject(state, {
    authRedirectPath: payload.path
  });
};

const authFail = (state, payload) =>
  updateObject(state, { error: payload.error, loading: false });

const reducer = (state = initialState, { type, payload = {} }) => {
  switch (type) {
    case actionTypes.AUTH_START:
      return authStart(state, payload);
    case actionTypes.AUTH_SUCCESS:
      return authSucccess(state, payload);
    case actionTypes.AUTH_FAIL:
      return authFail(state, payload);
    case actionTypes.AUTH_LOGOUT:
      return authLogout(state, payload);
    case actionTypes.SET_AUTH_REDIRECT_PATH:
      return setAuthRedirectPath(state, payload);

    default:
      return state;
  }
};

export default reducer;
