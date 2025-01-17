/* eslint-disable no-param-reassign */
import produce from 'immer';

export const INITIAL_STATE = {
  token: null,
  timestamp: null,
  publickey: null,
  hash: null,
  signed: false,
  loading: false,
};

export default function auth(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@auth/SIGN_IN_REQUEST': {
        draft.loading = true;
        break;
      }
      case '@auth/SIGN_IN_SUCCESS': {
        draft.token = action.payload.token;
        draft.timestamp = action.payload.timestamp;
        draft.publickey = action.payload.publickey;
        draft.hash = action.payload.hash;
        draft.signed = true;
        draft.loading = false;
        break;
      }
      case '@auth/SIGN_FAILURE': {
        draft.loading = false;
        break;
      }
      default:
    }
  });
}
