/* eslint-disable prefer-const */
import React, { useState, useEffect } from 'react';
// import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { Input } from '@rocketseat/unform';
import { MdEdit } from 'react-icons/md';

import { parseISO, format } from 'date-fns';
import { zonedTimeToUtc } from 'date-fns-tz';

// import history from '~/services/history';
import { Container, Content, Pagination, Previous, Next } from './styles';

import api from '~/services/api';

// import * as HeroActions from '../../store/modules/hero/actions';

export default function Dashboard() {
  const [heroes, setHeroes] = useState([]);
  let [page, setPage] = useState(1);
  const [loadingNext, setLoadingNext] = useState(false);
  const [finalPage, setFinalPage] = useState(false);
  const userInfo = useSelector(state => state.auth);
  const heroesdata = useSelector(state => state.user.heroes);

  // const dispatch = useDispatch();

  useEffect(() => {
    async function loadHeroes() {
      setHeroes(heroesdata.data.results);

      const checkFinalPage = await api.get('/v1/public/characters', {
        params: {
          ts: userInfo.timestamp,
          apikey: userInfo.publickey,
          hash: userInfo.hash,
          limit: 5,
          offset: (page - 1) * 5,
        },
      });

      if (checkFinalPage.data.length === 0) {
        setLoadingNext(false);
        setFinalPage(true);
      } else {
        setLoadingNext(false);
        setFinalPage(false);
      }
    }

    loadHeroes();
  }, [
    heroesdata.data.results,
    page,
    userInfo.hash,
    userInfo.publickey,
    userInfo.timestamp,
  ]);

  /*
  function editRequest(student) {
    dispatch(StudentActions.updateStudentRequest(student));
  }
  */

  async function next() {
    setLoadingNext(true);

    setPage((page += 1));

    const pageHeroes = await api.get('/v1/public/characters', {
      params: {
        ts: userInfo.timestamp,
        apikey: userInfo.publickey,
        hash: userInfo.hash,
        limit: 5,
        offset: (page - 1) * 5,
      },
    });

    page += 1;

    const checkFinalPage = await api.get('/v1/public/characters', {
      params: {
        ts: userInfo.timestamp,
        apikey: userInfo.publickey,
        hash: userInfo.hash,
        limit: 5,
        offset: (page - 1) * 5,
      },
    });

    if (checkFinalPage.data.length === 0) {
      setHeroes(pageHeroes.data);
      setLoadingNext(false);
      setFinalPage(true);
    } else {
      setLoadingNext(false);
      setFinalPage(false);
    }
  }

  async function previous() {
    setLoadingNext(true);
    setFinalPage(false);

    if (page !== 1) {
      setPage((page -= 1));
    }

    const pageHeroes = await api.get('/v1/public/characters', {
      params: {
        ts: userInfo.timestamp,
        apikey: userInfo.publickey,
        hash: userInfo.hash,
        limit: 5,
        offset: (page - 1) * 5,
      },
    });

    setHeroes(pageHeroes.data);
    setLoadingNext(false);
  }

  async function searchheroe(e) {
    if (e.target.value === '' || e.target.value === null) {
      const originalHeroes = await api.get('/ordersheroes');
      setHeroes(originalHeroes.data);
      return;
    }
    const similarHeroes = await api.get('/ordersheroes', {
      params: {
        name: e.target.value,
      },
    });
    setHeroes(similarHeroes.data);
  }

  return (
    <Container>
      <strong>Marvel Heroes</strong>
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
        <ul>
          {heroes.length === 0 ? (
            <span style={{ color: '#444444' }}> Any hero found...</span>
          ) : (
            heroes.map(hero => (
              <li key={hero.id}>
                <span>{hero.name}</span>
                <span>
                  {hero.description || 'This hero don´t have a description'}
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
                <MdEdit size={22} value={hero.id} />
              </li>
            ))
          )}
        </ul>
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
        <span>{page}</span>
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
