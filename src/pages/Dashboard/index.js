/* eslint-disable no-plusplus */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable prefer-const */
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Input } from '@rocketseat/unform';
import { MdVisibility } from 'react-icons/md';
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

import * as HeroActions from '../../store/modules/hero/actions';
import * as UserActions from '../../store/modules/user/actions';

export default function Dashboard() {
  const [heroes, setHeroes] = useState([]);
  let [page, setPage] = useState(1);
  let [slice, setSlice] = useState([0, 10]);
  const [loadingNext, setLoadingNext] = useState(false);
  const [finalPage, setFinalPage] = useState(false);
  const [finalPagespan, setFinalPageSpan] = useState(false);
  const [recents, setRecents] = useState(false);
  const heroesdata = useSelector(state => state.user.heroes);
  const recentHeroes = useSelector(state => state.user.recents);

  const dispatch = useDispatch();

  useEffect(() => {
    async function loadHeroes() {
      if (recents === true) {
        const reverseArray = [];
        for (let i = recentHeroes.length - 1; i >= 0; i--) {
          reverseArray.push(recentHeroes[i]);
        }

        const data = reverseArray.slice(slice[0], slice[1]);

        setHeroes(data);

        const checkFinalPage = recentHeroes.slice(slice[0] + 10, slice[1] + 10);

        if (checkFinalPage.length === 0) {
          setLoadingNext(false);
          setFinalPage(true);
        } else {
          setLoadingNext(false);
          setFinalPage(false);
        }

        const checkFinalPageSpan = recentHeroes.slice(
          slice[0] + 20,
          slice[1] + 20
        );

        if (checkFinalPageSpan.length === 0) {
          setFinalPageSpan(true);
        } else {
          setFinalPageSpan(false);
        }
        return;
      }

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
    const existOnRecents = recentHeroes.filter(recentHero => {
      return recentHero.id === hero.id;
    });
    if (existOnRecents.length > 0) {
      const updatedArray = recentHeroes.filter(recentHero => {
        return recentHero.id !== existOnRecents[0].id;
      });

      const updatedRecents = [...updatedArray];
      updatedRecents.push(hero);

      dispatch(UserActions.addRecentHero(updatedRecents));
      dispatch(HeroActions.updateHeroRequest(hero));
      history.push('/hero');
    } else {
      const updatedRecents = [...recentHeroes];
      updatedRecents.push(hero);
      dispatch(UserActions.addRecentHero(updatedRecents));
      dispatch(HeroActions.updateHeroRequest(hero));
      history.push('/hero');
    }
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
      if (recents === true) {
        const reverseArray = [];
        for (let i = recentHeroes.length - 1; i >= 0; i--) {
          reverseArray.push(recentHeroes[i]);
        }

        const data = reverseArray.slice(slice[0], slice[1]);
        setHeroes(data);
        return;
      }
      const data = heroesdata.slice(slice[0], slice[1]);
      setHeroes(data);
      return;
    }
    if (recents === true) {
      const similarHeroes = recentHeroes.filter(hero => {
        const inputValue = new RegExp(e.target.value, 'gi');
        return hero.name.match(inputValue);
      });
      setHeroes(similarHeroes);
      return;
    }
    const similarHeroes = heroesdata.filter(hero => {
      const inputValue = new RegExp(e.target.value, 'gi');
      return hero.name.match(inputValue);
    });
    setHeroes(similarHeroes);
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

  function searchByRecent() {
    setRecents(true);
    setPage(1);
    setSlice([0, 10]);
    setHeroes(recentHeroes);
  }

  function searchByAll() {
    setRecents(false);
    setPage(1);
    setSlice([0, 10]);
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
        <span
          id="recent"
          onClick={searchByAll}
          style={{
            color: `${!recents ? '#fff' : '#4c4c4c'}`,
            background: `${!recents ? '#F0141D' : 'none'}`,
            padding: `${!recents ? '5px' : '0px'}`,
            borderRadius: `${!recents ? '15%' : '0%'}`,
          }}
        >
          #all
        </span>
        <span
          id="recent"
          onClick={searchByRecent}
          style={{
            color: `${recents ? '#fff' : '#4c4c4c'}`,
            background: `${recents ? '#F0141D' : 'none'}`,
            padding: `${recents ? '5px' : '0px'}`,
            borderRadius: `${recents ? '15%' : '0%'}`,
          }}
        >
          #recent
        </span>
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
                  {hero.modified === '-0001-11-30T00:00:00-0500'
                    ? `${format(
                        zonedTimeToUtc(
                          parseISO('2012-10-12T17:25:43-0400'),
                          'America/Sao_Paulo'
                        ),
                        'dd-MM-yyyy hh:mm'
                      ).replace(/-/g, '/')}h` || 'Uninformed'
                    : `${format(
                        zonedTimeToUtc(
                          parseISO(hero.modified),
                          'America/Sao_Paulo'
                        ),
                        'dd-MM-yyyy hh:mm'
                      ).replace(/-/g, '/')}h` || 'Uninformed'}
                </span>
                <MdVisibility size={28} onClick={() => editRequest(hero)} />
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
        <span style={{ fontSize: '18px', color: '#4c4c4c' }}>{page}</span>
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
