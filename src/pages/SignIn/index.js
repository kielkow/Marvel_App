/* eslint-disable no-console */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import { signInRequest } from '~/store/modules/auth/actions';

// import { Container } from './styles';
import logo from '~/assets/logo.png';

const schema = Yup.object().shape({
  privatekey: Yup.string().required('Private key is required'),
  publickey: Yup.string().required('Public key is required'),
});

export default function SignIn() {
  const dispatch = useDispatch();
  const loading = useSelector(state => state.auth.loading);

  function handleSubmit({ privatekey, publickey }) {
    dispatch(signInRequest(privatekey, publickey));
  }

  return (
    <>
      <img src={logo} alt="MarvelApp" />

      <Form schema={schema} onSubmit={handleSubmit}>
        <label>PRIVATE KEY</label>
        <Input
          name="privatekey"
          type="text"
          placeholder="Your private key..."
        />

        <label>PUBLIC KEY</label>
        <Input name="publickey" type="text" placeholder="Your public key..." />

        <button type="submit">{loading ? 'Loading...' : 'Enter'}</button>
        <Link to="/register">Create free account</Link>
      </Form>
    </>
  );
}
