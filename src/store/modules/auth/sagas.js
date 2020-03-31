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

    toast.info(
      'Just few seconds, we´re preparing your enviroment right now! 😁',
      {
        autoClose: 5000,
      }
    );

    const [res1, res2, res3, res4, res5, res6, res7] = yield all([
      call(
        api.get,
        '/v1/public/characters' +
          `?ts=${timestamp}` +
          `&apikey=${publickey}` +
          `&hash=${hash}` +
          `&limit=100`
      ),
      call(
        api.get,
        '/v1/public/characters' +
          `?ts=${timestamp}` +
          `&apikey=${publickey}` +
          `&hash=${hash}` +
          `&offset=100` +
          `&limit=100`
      ),
      call(
        api.get,
        '/v1/public/characters' +
          `?ts=${timestamp}` +
          `&apikey=${publickey}` +
          `&hash=${hash}` +
          `&offset=200` +
          `&limit=100`
      ),
      call(
        api.get,
        '/v1/public/characters' +
          `?ts=${timestamp}` +
          `&apikey=${publickey}` +
          `&hash=${hash}` +
          `&offset=300` +
          `&limit=100`
      ),
      call(
        api.get,
        '/v1/public/characters' +
          `?ts=${timestamp}` +
          `&apikey=${publickey}` +
          `&hash=${hash}` +
          `&offset=400` +
          `&limit=100`
      ),
      call(
        api.get,
        '/v1/public/characters' +
          `?ts=${timestamp}` +
          `&apikey=${publickey}` +
          `&hash=${hash}` +
          `&offset=500` +
          `&limit=100`
      ),
      call(
        api.get,
        '/v1/public/characters' +
          `?ts=${timestamp}` +
          `&apikey=${publickey}` +
          `&hash=${hash}` +
          `&offset=600` +
          `&limit=100`
      ),
    ]);

    const finalResponse = res1.data.data.results
      .concat(res2.data.data.results)
      .concat(res3.data.data.results)
      .concat(res4.data.data.results)
      .concat(res5.data.data.results)
      .concat(res6.data.data.results)
      .concat(res7.data.data.results);

    const token = res1.data.etag;
    const heroes = finalResponse;

    api.defaults.headers.Authorization = `Bearer ${token}`;

    yield put(
      signInSuccess(
        token,
        heroes,
        timestamp,
        publickey,
        hash,
        [],
        1,
        [0, 10],
        false
      )
    );

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
    toast.info('Sorry, but this functionality is not avaible yet 😕');

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
