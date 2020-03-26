/* eslint-disable no-console */
import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import md5 from 'md5';

import api from '~/services/api';
import history from '~/services/history';

import { signInSuccess, signFailure } from './actions';

export function* signIn({ payload }) {
  try {
    const { privatekey, publickey } = payload;
    const timestamp = Math.floor(Date.now() / 1000);
    const hash = md5(`${timestamp}${privatekey}${publickey}`);

    const response = yield call(
      api.get,
      '/v1/public/characters' +
        `?ts=${timestamp}` +
        `&apikey=${publickey}` +
        `&hash=${hash}` +
        `&offset=0&limit=5`
    );

    const token = response.data.etag;
    const heroes = response.data;

    api.defaults.headers.Authorization = `Bearer ${token}`;

    yield put(signInSuccess(token, heroes, timestamp, publickey, hash));

    history.push('/dashboard');
  } catch (err) {
    toast.error('Authentication failure, please check your keys');
    yield put(signFailure());
  }
}

export function* signUp({ payload }) {
  try {
    const { name, email, password } = payload;

    yield call(api.post, 'users', {
      name,
      email,
      password,
      provider: true,
    });

    history.push('/');
  } catch (err) {
    toast.error('Registration failure, please verify your data');

    yield put(signFailure());
  }
}

export function setToken({ payload }) {
  if (!payload) return;

  const { token } = payload.auth;

  if (token) {
    api.defaults.headers.Authorization = `Bearer ${token}`;
  }
}

export default all([
  takeLatest('persist/REHYDRATE', setToken),
  takeLatest('@auth/SIGN_IN_REQUEST', signIn),
  takeLatest('@auth/SIGN_UP_REQUEST', signUp),
]);
