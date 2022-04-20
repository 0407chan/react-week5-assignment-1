import { render } from '@testing-library/react';

import { useDispatch, useSelector } from 'react-redux';

import regions from '../fixtures/regions';
import categories from '../fixtures/categories';
import restaurants from '../fixtures/restaurants';

import App from './App';
import { loadRegions } from '../redux/actions';

jest.mock('react-redux');
jest.mock('../services/api');

describe('App', () => {
  const dispatch = jest.fn();
  useDispatch.mockImplementation(() => dispatch);

  useSelector.mockImplementation((selector) => selector({
    regions,
    categories,
    restaurants,
  }));

  function renderApp() {
    return render(<App />);
  }

  it('fetchs regions, categories, restaurants', () => {
    renderApp();

    console.log('뭐나와', dispatch);

    expect(dispatch).toBeCalledTimes(3);
    expect(dispatch).toBeCalledWith(loadRegions());
  });

  it('renders regions', () => {
    const { queryByText } = renderApp();

    expect(queryByText(/서울/)).not.toBeNull();
    expect(queryByText(/대전/)).not.toBeNull();
  });

  it('renders categories', () => {
    const { queryByText } = renderApp();

    expect(queryByText(/한식/)).not.toBeNull();
    expect(queryByText(/일식/)).not.toBeNull();
  });

  it('renders restautants', () => {
    const { queryByText } = renderApp();

    expect(queryByText(/두향/)).not.toBeNull();
    expect(queryByText(/맥도날드/)).not.toBeNull();
  });
});
