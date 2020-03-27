/* eslint-disable react/no-array-index-key */
import React from 'react';
import { useSelector } from 'react-redux';
import { MdArrowBack, MdInfo } from 'react-icons/md';
import { FaBookOpen } from 'react-icons/fa';
import { Input } from '@rocketseat/unform';

import { Link } from 'react-router-dom';
import { Container, Content, ContentChild, SeriesList } from './styles';

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
      <ContentChild>
        <header>
          <strong>
            <FaBookOpen />
            Series
          </strong>
        </header>
        <SeriesList>
          {herodata.hero.series.items.length === 0 ? (
            <span style={{ color: '#444444' }}> Any serie found...</span>
          ) : (
            herodata.hero.series.items.map((serie, index) => (
              <li key={index}>
                <img
                  src="https://api.adorable.io/avatars/50/abott@adorable.png"
                  alt={serie.name}
                />
                <div id="content">
                  <div>
                    <span>Title: Teste</span>
                    <span>Number: #123</span>
                  </div>
                  <textarea
                    name="description"
                    disabled
                    value={
                      herodata.hero.description ||
                      'This hero don´t have a description'
                    }
                  />
                </div>
              </li>
            ))
          )}
        </SeriesList>
      </ContentChild>
    </Container>
  );
}
