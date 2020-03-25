/* eslint-disable no-console */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { Link } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';

// import { Container } from './styles';
import logo from '~/assets/logo.png';

const schema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid e-mail')
    .required('Email is required'),
  password: Yup.string().required('Password is required'),
});

export default function SignIn() {
  function handleSubmit(data) {
    console.tron.log(data);
  }

  return (
    <>
      <img src={logo} alt="MarvelApp" />

      <Form schema={schema} onSubmit={handleSubmit}>
        <label>E-MAIL</label>
        <Input name="email" type="email" placeholder="Your e-mail..." />

        <label>PASSWORD</label>
        <Input name="password" type="password" placeholder="Your password..." />

        <button type="submit">Enter</button>
        <Link to="/register">Create free account</Link>
      </Form>
    </>
  );
}
