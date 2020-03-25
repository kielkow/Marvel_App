/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { Link } from 'react-router-dom';

// import { Container } from './styles';
import logo from '~/assets/logo.png';

export default function SignUp() {
  return (
    <>
      <img src={logo} alt="MarvelApp" />

      <form>
        <label>NAME</label>
        <input name="name" placeholder="Your full name..." />

        <label>E-MAIL</label>
        <input name="email" type="email" placeholder="Your e-mail..." />

        <label>PASSWORD</label>
        <input name="password" type="password" placeholder="Your password..." />

        <button type="submit">Create account</button>
        <Link to="/">I already have an account</Link>
      </form>
    </>
  );
}
