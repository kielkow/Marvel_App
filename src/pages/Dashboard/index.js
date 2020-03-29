/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable prefer-const */
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Input } from '@rocketseat/unform';
import { MdEdit } from 'react-icons/md';
import { FaSuperpowers } from 'react-icons/fa';

import { parseISO, format } from 'date-fns';
import { zonedTimeToUtc } from 'date-fns-tz';
import history from '~/services/history';

import {
  Container,
  Content,
  HeroesList,
  Pagination,
  Previous,
  Next,
} from './styles';

import jsonserverApi from '~/services/jsonserverApi';

import * as HeroActions from '../../store/modules/hero/actions';

export default function Dashboard() {
  const [heroes, setHeroes] = useState([]);
  let [page, setPage] = useState(1);
  let [slice, setSlice] = useState([0, 10]);
  const [loadingNext, setLoadingNext] = useState(false);
  const [finalPage, setFinalPage] = useState(false);
  const [finalPagespan, setFinalPageSpan] = useState(false);
  const heroesdata = useSelector(state => state.user.heroes.data.results);

  const dispatch = useDispatch();

  useEffect(() => {
    async function loadHeroes() {
      const data = heroesdata.slice(slice[0], slice[1]);

      setHeroes(data);

      const checkFinalPage = heroesdata.slice(slice[0] + 10, slice[1] + 10);

      if (checkFinalPage.length === 0) {
        setLoadingNext(false);
        setFinalPage(true);
      } else {
        setLoadingNext(false);
        setFinalPage(false);
      }

      const checkFinalPageSpan = heroesdata.slice(slice[0] + 20, slice[1] + 20);

      if (checkFinalPageSpan.length === 0) {
        setFinalPageSpan(true);
      } else {
        setFinalPageSpan(false);
      }
    }

    loadHeroes();
  }, [slice]);

  function editRequest(hero) {
    dispatch(HeroActions.updateHeroRequest(hero));
    history.push('/hero');
  }

  async function next() {
    setLoadingNext(true);
    setPage((page += 1));
    setSlice([slice[0] + 10, slice[1] + 10]);
  }

  async function previous() {
    setLoadingNext(true);
    setFinalPage(false);

    if (slice[0] !== 0) {
      setPage((page -= 1));
      setSlice([slice[0] - 10, slice[1] - 10]);
    }

    setLoadingNext(false);
  }

  async function searchheroe(e) {
    if (e.target.value === '' || e.target.value === null) {
      const originalHeroes = await jsonserverApi.get('/heroes', {
        params: {
          _page: page,
        },
      });
      setHeroes(originalHeroes.data);
      return;
    }
    const similarHeroes = await jsonserverApi.get('/heroes', {
      params: {
        name_like: e.target.value,
      },
    });
    setHeroes(similarHeroes.data);
  }

  function jumpTooPage() {
    setLoadingNext(true);
    setPage((page += 2));
    setSlice([slice[0] + 20, slice[1] + 20]);
  }

  function returnTooPage() {
    setLoadingNext(true);
    setFinalPage(false);

    if (slice[0] !== 0) {
      setPage((page -= 2));
      setSlice([slice[0] - 20, slice[1] - 20]);
    }

    setLoadingNext(false);
  }

  return (
    <Container>
      <strong>
        <FaSuperpowers />
        Marvel Heroes
      </strong>
      <header>
        <Input
          name="name"
          type="text"
          placeholder="&#xf002; Search for hero..."
          style={{ fontFamily: 'Arial, FontAwesome' }}
          onChange={searchheroe}
        />
      </header>
      <Content>
        <header>
          <span>Hero</span>
          <span>Description</span>
          <span>Modified</span>
          <span />
        </header>
        <HeroesList>
          {heroes.length === 0 ? (
            <span style={{ color: '#444444' }}> Any hero found...</span>
          ) : (
            heroes.map(hero => (
              <li key={hero.id}>
                <span>{hero.name}</span>
                <span>
                  {hero.description || 'This hero doesn´t have a description'}
                </span>
                <span>
                  {format(
                    zonedTimeToUtc(
                      parseISO(hero.modified),
                      'America/Sao_Paulo'
                    ),
                    'dd-MM-yyyy hh:mm'
                  ).replace(/-/g, '/')}
                  h
                </span>
                <MdEdit size={22} onClick={() => editRequest(hero)} />
              </li>
            ))
          )}
        </HeroesList>
      </Content>
      <Pagination>
        <Previous
          type="button"
          onClick={() => previous()}
          page={page}
          loadingNext={loadingNext}
        >
          Previous
        </Previous>
        <span
          style={{
            display: `${page - 1 <= 1 ? 'none' : 'block'}`,
            cursor: 'pointer',
          }}
          onClick={returnTooPage}
        >
          {page - 2}
        </span>
        <span
          style={{
            display: `${page - 1 === 0 ? 'none' : 'block'}`,
            cursor: 'pointer',
          }}
          onClick={previous}
        >
          {page - 1}
        </span>
        <span style={{ fontSize: '18px' }}>{page}</span>
        <span
          style={{
            display: `${finalPage ? 'none' : 'block'}`,
            cursor: 'pointer',
          }}
          onClick={next}
        >
          {page + 1}
        </span>
        <span
          style={{
            display: `${finalPagespan ? 'none' : 'block'}`,
            cursor: 'pointer',
          }}
          onClick={jumpTooPage}
        >
          {page + 2}
        </span>
        <Next
          type="button"
          onClick={() => next()}
          loadingNext={loadingNext}
          finalPage={finalPage}
        >
          Next
        </Next>
      </Pagination>
    </Container>
  );
}
