import { render, screen } from '@testing-library/react';
import { unmountComponentAtNode } from 'react-dom';
import { act } from "react-dom/test-utils";
import React from 'react';
import Expirations from './Expirations.js';
import { successData, zeroStats } from '../../utils/test_data.js';

describe('Testing Expirations component rendering', () => {
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

  test('renders expired bottles data when it is not 0', () => {
    act(() => {
      render(<Expirations stats={successData.data.vaccineData} />, container)
    });
    expect(screen.getByText(/Expired bottles/i)).toBeInTheDocument();
  })

  test('renders text "No bottles have expired on this day" when there are no expired bottles', () => {
    act(() => {
      render(<Expirations stats={zeroStats} />, container)
    });
    expect(screen.getByText(/No bottles have expired on this day/i)).toBeInTheDocument();
  })

  test('renders text "No vaccines have expired overall" when there are no expired vaccines overall', () => {
    act(() => {
      render(<Expirations stats={zeroStats} />, container)
    });
    expect(screen.getByText(/No vaccines have expired overall/i)).toBeInTheDocument();
  })

  test('renders text "No vaccines will expire in the next ten days" when no vaccines will expire in the next ten days', () => {
    act(() => {
      render(<Expirations stats={zeroStats} />, container)
    });
    expect(screen.getByText(/No vaccines will expire in the next ten days/i)).toBeInTheDocument();
  })
})
