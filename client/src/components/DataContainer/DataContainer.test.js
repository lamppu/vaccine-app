import { render, screen } from '@testing-library/react';
import { unmountComponentAtNode } from 'react-dom';
import { act } from "react-dom/test-utils";
import React from 'react';
import DataContainer from './DataContainer.js';
import { successDateTime, successData, invalidDateTime, invalidDateData } from '../../utils/test_data.js';

describe('Testing DataContainer rendering', () => {
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

  test('renders data container header "On Thu Apr 01 2021 by 23:59:59.999999"', () => {
    act(() => {
      render(<DataContainer
        dateTimeString={successDateTime}
        dataset={successData}
      />, container)
    });
    expect(screen.getByText('On Thu Apr 01 2021 by 23:59:59.999999')).toBeInTheDocument();
  });

  test('shows the correct number of orders', () => {
    act(() => {
      render(<DataContainer
        dateTimeString={successDateTime}
        dataset={successData}
      />, container)
    });

    expect(screen.getByText(/Total number of arrived orders: 41/i)).toBeInTheDocument();
  });

  test('does not render the data container due to error', () => {
    act(() => {
      render(<DataContainer
        dateTimeString={invalidDateTime}
        dataset={invalidDateData}
      />, container)
    });

    expect(screen.queryByTestId('dataCont')).not.toBeInTheDocument();
  });
})
