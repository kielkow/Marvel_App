/* eslint-disable no-param-reassign */
import produce from 'immer';

const INITIAL_STATE = {
  hero: null,
};

export default function hero(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@hero/UPDATE_HERO_REQUEST': {
        draft.hero = action.payload.data;
        break;
      }
      default:
    }
  });
}
