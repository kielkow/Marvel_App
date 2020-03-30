/* eslint-disable no-param-reassign */
import produce from 'immer';

const INITIAL_STATE = {
  heroes: null,
  recents: null,
};

export default function heroes(state = INITIAL_STATE, action) {
  switch (action.type) {
    case '@auth/SIGN_IN_SUCCESS':
      return produce(state, draft => {
        draft.heroes = action.payload.heroes;
        draft.recents = action.payload.recents;
      });
    case '@user/ADD_RECENT_HERO':
      return produce(state, draft => {
        draft.recents = action.payload.updatedRecents;
      });
    default:
      return state;
  }
}
