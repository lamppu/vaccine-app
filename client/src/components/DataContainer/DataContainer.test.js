import { render, screen } from '@testing-library/react';
import { unmountComponentAtNode } from 'react-dom';
import { act } from "react-dom/test-utils";
import React, { useState } from 'react';
import DataContainer from './DataContainer.js';
import { successData, zeroData } from '../../utils/test_data.js';

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
  const unmockedFetch = global.fetch;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);

    global.fetch = jest.fn((url) => {
      const ep = url.slice(22,-33);
      let resp;

      switch (ep) {
        case 'expiredbottles':
          resp = successData.successExpirationsData;
          break;
        case 'lefttouse':
          resp = successData.successLeftToUseData;
          break;
        case 'nexttendays':
          resp = successData.successTenDaysData;
          break;
        case 'orders':
          resp = successData.successOrdersData;
          break;
        case 'overall':
          resp = successData.successOverallData;
          break;
        case 'vaccinations':
          resp = successData.successVaccinationsData;
          break;
        default:
          resp = {
            "success": false,
            "data": null,
            "error": "Something went wrong"
          };
      }

      return Promise.resolve({
        json: () => (resp)
      });
    });
  });

  afterEach(() => {
    unmountComponentAtNode(container);
    container.remove();
    container = null;
    global.fetch = unmockedFetch;
  });

  test('renders data container header "On Thu Apr 01 2021 by 23:59:59"', async () => {
    act(() => {
      render(<TestApp />, container)
    });

    expect(await screen.findByText('On Thu Apr 01 2021 by 23:59:59')).toBeInTheDocument();
  });

  test('shows the correct number of orders', async () => {
    act(() => {
      render(<TestApp />, container)
    });

    expect(await screen.findByText(/Total number of arrived orders: 9/i)).toBeInTheDocument();
  });

  test('shows the correct text when no orders have arrived', async () => {
    global.fetch = jest.fn((url) => {
      const ep = url.slice(22,-33);
      let resp;

      switch (ep) {
        case 'expiredbottles':
          resp = zeroData.zeroExpirationsData;
          break;
        case 'lefttouse':
          resp = zeroData.zeroLeftToUseData;
          break;
        case 'nexttendays':
          resp = zeroData.zeroTenDaysData;
          break;
        case 'orders':
          resp = zeroData.zeroOrdersData;
          break;
        case 'overall':
          resp = zeroData.zeroOverallData;
          break;
        case 'vaccinations':
          resp = zeroData.zeroVaccinationsData;
          break;
        default:
          resp = {
            "success": false,
            "data": null,
            "error": "Something went wrong"
          };
      }

      return Promise.resolve({
        json: () => (resp)
      });
    });

    act(() => {
      render(<TestApp />, container)
    });

    expect(await screen.findByText(/No orders have arrived on this day/i)).toBeInTheDocument();
  });
})
