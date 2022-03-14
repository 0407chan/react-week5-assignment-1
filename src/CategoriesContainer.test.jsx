import { render, fireEvent } from '@testing-library/react';

import { useDispatch, useSelector } from 'react-redux';

import CategoriesContainer from './CategoriesContainer';

jest.mock('react-redux');

describe('CategoriesContainer', () => {
  it('카테고리(버튼)들을 보여준다.', () => {
    const dispatch = jest.fn();

    useDispatch.mockImplementation(() => dispatch);
    useSelector.mockImplementation((selector) => selector({
      categories: [
        { id: 1, name: '한식' },
      ],
    }));
    const { container, getByText } = render((
      <CategoriesContainer />
    ));

    expect(container).toHaveTextContent('한식');
    fireEvent.click(getByText('한식'));
    expect(dispatch).toBeCalled();
  });
});
