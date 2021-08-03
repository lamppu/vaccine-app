import { render, screen } from '@testing-library/react';
import { unmountComponentAtNode } from 'react-dom';
import { act } from "react-dom/test-utils";
import React from 'react';
import App from './App.js';

let container = null;

describe('Testing App rendering with initial state', () => {

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    unmountComponentAtNode(container);
    container.remove();
    container = null;
  });

  test('renders the app heading', () => {
    act(() => {
      render(<App />, container);
    });

    const h1Element = screen.getByText(/Vaccine App/);
    expect(h1Element).toBeInTheDocument();
  });

  test('renders input for date', () => {
    act(() => {
      render(<App />, container);
    });
    expect(screen.getByTestId('dateInput')).toBeInTheDocument();
  });

  test('renders input for time', () => {
    act(() => {
      render(<App />, container);
    });
    expect(screen.getByTestId('timeInput')).toBeInTheDocument();
  });

  test('does not render data container', () => {
    act(() => {
      render(<App />, container);
    });
    expect(screen.queryByTestId('dataCont')).not.toBeInTheDocument();
  });

  test('does not render error container', () => {
    act(() => {
      render(<App />, container);
    });
    expect(screen.queryByTestId('errorCont')).not.toBeInTheDocument();
  });
})
