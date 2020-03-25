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
  email: Yup.string()
    .email('Invalid e-mail')
    .required('Email is required'),
  password: Yup.string().required('Password is required'),
});

export default function SignIn() {
  const dispatch = useDispatch();
  const loading = useSelector(state => state.auth.loading);

  function handleSubmit({ email, password }) {
    dispatch(signInRequest(email, password));
  }

  return (
    <>
      <img src={logo} alt="MarvelApp" />

      <Form schema={schema} onSubmit={handleSubmit}>
        <label>E-MAIL</label>
        <Input name="email" type="email" placeholder="Your e-mail..." />

        <label>PASSWORD</label>
        <Input name="password" type="password" placeholder="Your password..." />

        <button type="submit">{loading ? 'Loading...' : 'Enter'}</button>
        <Link to="/register">Create free account</Link>
      </Form>
    </>
  );
}
