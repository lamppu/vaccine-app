import { render, screen } from '@testing-library/react';
import { unmountComponentAtNode } from 'react-dom';
import { act } from "react-dom/test-utils";
import React from 'react';
import Header from './Header.js';

describe('Testing Header rendering', () => {
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

  test('renders header', () => {
    act(() => {
      render(<Header />, container)
    });

    expect(screen.getByText('Vaccine App')).toBeInTheDocument();
  });
})
