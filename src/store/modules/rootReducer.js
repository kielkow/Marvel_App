import { combineReducers } from 'redux';

import auth from './auth/reducer';
import user from './user/reducer';
import hero from './hero/reducer';

export default combineReducers({
  auth,
  user,
  hero,
});
