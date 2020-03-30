/* eslint-disable no-console */
import { takeLatest, all } from 'redux-saga/effects';

export function addRecent({ payload }) {
  // console.log('PAYLOAD SAGA: ', payload.data);
  return payload;
}

export default all([takeLatest('@user/ADD_RECENT_HERO', addRecent)]);
