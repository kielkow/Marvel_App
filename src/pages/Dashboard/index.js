/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable prefer-const */
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
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
  const [loadingNext, setLoadingNext] = useState(false);
  const [finalPage, setFinalPage] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    async function loadHeroes() {
      const response = await jsonserverApi.get('/heroes', {
        params: {
          _page: page,
        },
      });

      const { data } = response;

      setHeroes(data);

      const checkFinalPage = await jsonserverApi.get('/heroes', {
        params: {
          _page: page + 1,
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
  }, [page]);

  function editRequest(hero) {
    dispatch(HeroActions.updateHeroRequest(hero));
    history.push('/hero');
  }

  async function next() {
    setLoadingNext(true);

    setPage((page += 1));

    const pageHeroes = await jsonserverApi.get('/heroes', {
      params: {
        _page: page,
      },
    });

    const checkFinalPage = await jsonserverApi.get('/heroes', {
      params: {
        _page: page + 1,
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

    const pageHeroes = await jsonserverApi.get('/heroes', {
      params: {
        _page: page,
      },
    });

    setHeroes(pageHeroes.data);
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
