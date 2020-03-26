/* eslint-disable camelcase */
import { takeLatest, all } from 'redux-saga/effects';

export function updateHero({ payload }) {
  // console.log('PAYLOAD SAGA: ', payload.data);
  return payload;
}

export default all([takeLatest('@hero/UPDATE_HERO_REQUEST', updateHero)]);
