// * testing reducers
import reducer from './auth';
import * as actions from '../actions/actionTypes';

const initialState = {
  idToken: null,
  userId: null,
  error: null,
  loading: false,
  authRedirectPath: '/'
};

describe('auth reducer', () => {
  it('should return the initial state if no action was dispatched', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should store the token upon login', () => {
    expect(
      reducer(initialState, {
        type: actions.AUTH_SUCCESS,
        payload: { idToken: 'some-token', userId: 'some-user-id' }
      })
    ).toEqual({
      ...initialState,
      idToken: 'some-token',
      userId: 'some-user-id'
    });
  });
});
