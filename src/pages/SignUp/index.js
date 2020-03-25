/* eslint-disable no-console */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { Link } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';

// import { Container } from './styles';
import logo from '~/assets/logo.png';

export default function SignUp() {
  function handleSubmit(data) {
    console.tron.log(data);
  }

  return (
    <>
      <img src={logo} alt="MarvelApp" />

      <Form onSubmit={handleSubmit}>
        <label>NAME</label>
        <Input name="name" placeholder="Your full name..." />

        <label>E-MAIL</label>
        <Input name="email" type="email" placeholder="Your e-mail..." />

        <label>PASSWORD</label>
        <Input name="password" type="password" placeholder="Your password..." />

        <button type="submit">Create account</button>
        <Link to="/">I already have an account</Link>
      </Form>
    </>
  );
}
