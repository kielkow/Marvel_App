/* eslint-disable no-param-reassign */
import produce from 'immer';

const INITIAL_STATE = {
  heroes: null,
  recents: null,
  page: 1,
  slice: [0, 10],
  recent: false,
};

export default function heroes(state = INITIAL_STATE, action) {
  switch (action.type) {
    case '@auth/SIGN_IN_SUCCESS':
      return produce(state, draft => {
        draft.heroes = action.payload.heroes;
        draft.recents = action.payload.recents;
        draft.page = action.payload.page;
        draft.slice = action.payload.slice;
        draft.recent = action.payload.recent;
      });
    case '@user/ADD_RECENT_HERO':
      return produce(state, draft => {
        draft.recents = action.payload.updatedRecents;
      });
    case '@user/CHANGE_PAGE':
      return produce(state, draft => {
        draft.page = action.payload.page;
        draft.slice = action.payload.slice;
      });
    case '@user/CHANGE_RECENT':
      return produce(state, draft => {
        draft.recent = action.payload.recent;
      });
    default:
      return state;
  }
}
