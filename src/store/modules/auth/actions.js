export function signInRequest(privatekey, publickey) {
  return {
    type: '@auth/SIGN_IN_REQUEST',
    payload: { privatekey, publickey },
  };
}

export function signInSuccess(
  token,
  heroes,
  timestamp,
  publickey,
  hash,
  recents,
  page,
  slice
) {
  return {
    type: '@auth/SIGN_IN_SUCCESS',
    payload: {
      token,
      heroes,
      timestamp,
      publickey,
      hash,
      recents,
      page,
      slice,
    },
  };
}

export function signUpRequest(name, email, password) {
  return {
    type: '@auth/SIGN_UP_REQUEST',
    payload: { name, email, password },
  };
}

export function signFailure() {
  return {
    type: '@auth/SIGN_FAILURE',
  };
}
