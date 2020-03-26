import React from 'react';
import { useSelector } from 'react-redux';
import { MdArrowBack, MdInfo } from 'react-icons/md';
import { Input } from '@rocketseat/unform';

import { Link } from 'react-router-dom';
import { Container, Content } from './styles';

export default function Hero() {
  const herodata = useSelector(state => state.hero);

  return (
    <Container>
      <header>
        <strong>
          <MdInfo />
          Hero Info
        </strong>
        <div>
          <Link type="button" to="/dashboard">
            <MdArrowBack color="#fff" size={18} />
            <span>Back</span>
          </Link>
        </div>
      </header>
      <Content>
        <img
          src="https://api.adorable.io/avatars/50/abott@adorable.png"
          alt={herodata.hero.name}
        />
        <div>
          <div>
            <span>NAME</span>
            <Input
              name="name"
              disabled
              value={herodata.hero.name || 'Any name detected'}
            />
          </div>
          <div>
            <span>DESCRIPTION</span>
            <textarea
              name="description"
              disabled
              value={
                herodata.hero.description ||
                'This hero don´t have a description'
              }
            />
          </div>
        </div>
      </Content>
    </Container>
  );
}
