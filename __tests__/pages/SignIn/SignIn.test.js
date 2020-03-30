/* eslint-disable no-undef */
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { render, fireEvent } from '@testing-library/react';

import { signInRequest } from '~/store/modules/auth/actions';
import SignIn from '~/pages/SignIn';

jest.mock('react-redux');

describe('SignIn page', () => {
  it('should render sign in', () => {
    useSelector.mockImplementation(cb =>
      cb({
        loading: false,
      })
    );

    const { getByTestId, getByText } = render(<SignIn />);

    expect(getByTestId('privatekey')).toContainElement(getByText(''));
    expect(getByTestId('publickey')).toContainElement(getByText(''));
  });

  it('should be able to sign in on application', () => {
    const { getByTestId, getByLabelText } = render(<SignIn />);

    const dispatch = jest.fn();

    useDispatch.mockReturnValue(dispatch);

    fireEvent.change(getByLabelText('PRIVATE KEY'), {
      target: { value: 'd69cc44b28d4785232c37f7a5668e37fe8f22587' },
    });
    fireEvent.change(getByLabelText('PUBLIC KEY'), {
      target: { value: '83908b478d58b1de4d680a466b48bdc4' },
    });
    fireEvent.submit(getByTestId('signin-form'));

    expect(dispatch).toHaveBeenCalledWith(
      signInRequest(
        'd69cc44b28d4785232c37f7a5668e37fe8f22587',
        '83908b478d58b1de4d680a466b48bdc4'
      )
    );
  });
});
