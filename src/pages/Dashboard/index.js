/* eslint-disable prefer-const */
import React, { useState, useEffect } from 'react';
// import { useDispatch } from 'react-redux';
import { Input } from '@rocketseat/unform';
import { MdEdit } from 'react-icons/md';

import { parseISO, format } from 'date-fns';
import { zonedTimeToUtc } from 'date-fns-tz';

// import history from '~/services/history';
import { Container, Content, Pagination, Previous, Next } from './styles';

import api from '~/services/api';

// import * as StudentActions from '../../store/modules/student/actions';

export default function Dashboard() {
  const [heroes, setHeroes] = useState([]);
  let [page, setPage] = useState(1);
  const [loadingNext, setLoadingNext] = useState(false);
  const [finalPage, setFinalPage] = useState(false);

  // const dispatch = useDispatch();

  useEffect(() => {
    async function loadHeroes() {
      /*
      const response = await api.get('/ordersheroes', {
        params: {
          page,
        },
      });

      const { data } = response;
      */

      const data = [
        {
          id: 1,
          name: 'Hero 1',
          description: 'Description 1',
          modified: '2014-04-29T14:18:17-0400',
        },
        {
          id: 2,
          name: 'Hero 2',
          description: 'Description 2',
          modified: '2014-04-29T14:18:17-0400',
        },
        {
          id: 3,
          name: 'Hero 3',
          description: 'Description 3',
          modified: '2014-04-29T14:18:17-0400',
        },
        {
          id: 4,
          name: 'Hero 4',
          description: 'Description 4',
          modified: '2014-04-29T14:18:17-0400',
        },
        {
          id: 5,
          name: 'Hero 5',
          description: 'Description 5',
          modified: '2014-04-29T14:18:17-0400',
        },
      ];

      setHeroes(data);

      const checkFinalPage = await api.get('/ordersheroes', {
        params: {
          page: page + 1,
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

  /*
  async function reloadHeroes() {
    const response = await api.get('/ordersheroes', {
      params: {
        page,
      },
    });
    const { data } = response;
    setHeroes(data);
    const checkFinalPage = await api.get('/ordersheroes', {
      params: {
        page: page + 1,
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
  */

  /*
  function editRequest(student) {
    dispatch(StudentActions.updateStudentRequest(student));
  }
  */

  async function next() {
    setLoadingNext(true);

    setPage((page += 1));

    const pageHeroes = await api.get('/ordersheroes', {
      params: {
        page,
      },
    });

    const checkFinalPage = await api.get('/ordersheroes', {
      params: {
        page: page + 1,
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

    const pageHeroes = await api.get('/ordersheroes', {
      params: {
        page,
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
            heroes.map(heroe => (
              <li key={heroe.id}>
                <span>{heroe.name}</span>
                <span>{heroe.description}</span>
                <span>
                  {format(
                    zonedTimeToUtc(
                      parseISO(heroe.modified),
                      'America/Sao_Paulo'
                    ),
                    'dd-MM-yyyy hh:mm'
                  ).replace(/-/g, '/')}
                  h
                </span>
                <MdEdit size={22} />
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
