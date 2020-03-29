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

  function splitTitle(value) {
    if (value.includes('#')) {
      const splitValue = value.split('#');
      return splitValue[0];
    }
    return value;
  }

  function splitNumber(value) {
    if (value.includes('#')) {
      const splitValue = value.split('#');
      return `#${splitValue[1]}`;
    }
    return 'Special Edition';
  }

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
          src={
            `${herodata.hero.thumbnail.path}.${herodata.hero.thumbnail.extension}` ||
            'https://api.adorable.io/avatars/50/abott@adorable.png'
          }
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
                'This hero doesn´t have a description'
              }
            />
          </div>
        </div>
      </Content>
      <ContentChild>
        <header>
          <strong>
            <FaBookOpen />
            Comics
          </strong>
        </header>
        <SeriesList>
          {herodata.hero.comics.items.length === 0 ? (
            <span style={{ color: '#444444' }}> Any serie found...</span>
          ) : (
            herodata.hero.comics.items.map((comic, index) => (
              <li key={index}>
                <img
                  src="https://api.adorable.io/avatars/50/abott@adorable.png"
                  alt={comic.name}
                />
                <div id="content">
                  <div>
                    <span>{`Title: ${splitTitle(comic.name)}`}</span>
                    <span>{`Number: ${splitNumber(comic.name)}`}</span>
                  </div>
                  <textarea
                    name="description"
                    disabled
                    value={
                      herodata.hero.description ||
                      'This serie doesn´t have a description'
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
