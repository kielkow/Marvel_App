/* eslint-disable no-param-reassign */
import produce from 'immer';

const INITIAL_STATE = {
  heroes: null,
};

export default function heroes(state = INITIAL_STATE, action) {
  switch (action.type) {
    case '@auth/SIGN_IN_SUCCESS':
      return produce(state, draft => {
        draft.heroes = action.payload.heroes;
      });
    default:
      return state;
  }
}
