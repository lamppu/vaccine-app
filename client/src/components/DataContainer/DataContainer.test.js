import { render, screen } from '@testing-library/react';
import { unmountComponentAtNode } from 'react-dom';
import { act } from "react-dom/test-utils";
import React, { useState } from 'react';
import DataContainer from './DataContainer.js';
import { successData, invalidDateData } from '../../utils/test_data.js';

const TestApp = () => {
  const iso = '2021-04-01T23:59:59.999999Z';
  const [error, setError] = useState({error: false, msg: null});

  return (
    <div>
      <DataContainer
        iso={iso}
        error={error}
        onErrorChange={setError}
      />
      <div>
        {error.msg}
      </div>
    </div>
  )
}

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

  test('renders data container header "On Thu Apr 01 2021 by 23:59:59.999999"', async () => {
    jest.spyOn(global, 'fetch')
    .mockImplementation(() => Promise.resolve({ json: () => Promise.resolve(successData)}));

    act(() => {
      render(<TestApp />, container)
    });

    expect(await screen.findByText('On Thu Apr 01 2021 by 23:59:59.999999')).toBeInTheDocument();
  });

  test('shows the correct number of orders', async () => {
    jest.spyOn(global, 'fetch')
    .mockImplementation(() => Promise.resolve({ json: () => Promise.resolve(successData)}));

    act(() => {
      render(<TestApp />, container)
    });

    expect(await screen.findByText(/Total number of arrived orders: 41/i)).toBeInTheDocument();
  });

  test('shows error message due to error', async () => {
    jest.spyOn(global, 'fetch')
    .mockImplementation(() => Promise.resolve({ json: () => Promise.resolve(invalidDateData)}));

    act(() => {
      render(<TestApp />, container)
    });

    expect(await screen.findByText('Invalid Date')).toBeInTheDocument();
  });
})
