/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { Link } from 'react-router-dom';

// import { Container } from './styles';
import logo from '~/assets/logo.png';

export default function SignIn() {
  return (
    <>
      <img src={logo} alt="MarvelApp" />

      <form>
        <label>E-MAIL</label>
        <input name="email" type="email" placeholder="Your e-mail..." />

        <label>PASSWORD</label>
        <input name="password" type="password" placeholder="Your password..." />

        <button type="submit">Enter</button>
        <Link to="/register">Create free account</Link>
      </form>
    </>
  );
}
