import { render, screen } from '@testing-library/react';
import { unmountComponentAtNode } from 'react-dom';
import { act } from "react-dom/test-utils";
import React from 'react';
import ErrorContainer from './ErrorContainer.js';

describe('Testing ErrorContainer rendering', () => {
  let container = null;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    unmountComponentAtNode(container);
    container.remove();
    container = null;
  });

  test('renders error container and shows message "Invalid date"', () => {
    act(() => {
      render(<ErrorContainer
        error={{error: true, msg: 'Invalid Date'}}
      />, container)
    });

    expect(screen.getByText('Invalid Date')).toBeInTheDocument();
  });

  test('does not render error container when there is no error', () => {
    act(() => {
      render(<ErrorContainer
        error={{error: false, msg: null}}
      />, container)
    });

    expect(screen.queryByTestId('errorCont')).not.toBeInTheDocument();
  });
})
