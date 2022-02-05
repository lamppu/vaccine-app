import { render, screen } from '@testing-library/react';
import { unmountComponentAtNode } from 'react-dom';
import { act } from "react-dom/test-utils";
import React, { useState } from 'react';
import DataBlock from './DataBlock.js';
import { successData } from '../../utils/test_data.js';


const getOrdersContents = (data) => {
  return (
    <div>
      <p>Total number of arrived orders: {data.orders}</p>
    </div>
  )
}

const getOverallContents = (data) => {
  return (
    <div>
      <p>Vaccines that have expired overall: {data.expiredVaccinesOverall}</p>
    </div>
  )
}

const TestApp = ({iso, endpoint}) => {
  const [error, setError] = useState({error: false, msg: null});

  let contentsFn;

  switch (endpoint) {
    case 'orders':
      contentsFn = getOrdersContents;
      break;
    case 'overall':
      contentsFn = getOverallContents;
      break;
    default:
      contentsFn = null;
  }

  return (
    <div>
      <DataBlock
        iso={iso}
        error={error}
        onErrorChange={setError}
        endpoint={endpoint}
        getContents={contentsFn}
      />
      <div>
        {error.msg}
      </div>
    </div>
  )
}

describe('Testing DataBlock rendering', () => {
  let container = null;
  const unmockedFetch = global.fetch;
  const successIso = '2021-04-01T23:59:59.999999Z';

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);

    global.fetch = jest.fn((url) => {
      const ep = url.slice(5,-33);
      console.log(ep);
      let resp;

      switch (ep) {
        case 'orders':
          resp = successData.successOrdersData;
          break;
        case 'overall':
          resp = successData.successOverallData;
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

  test('renders contents succesfully', async () => {

    act(() => {
      render(
        <TestApp
          iso={successIso}
          endpoint='orders'
        />, container)
    });

    expect(await screen.findByText(/Total number of arrived orders: 9/i)).toBeInTheDocument();
  });


  test('shows error message due to error', async () => {
    act(() => {
      render(
        <TestApp
          iso='k'
          endpoint='orders'
        />, container)
    });

    expect(await screen.findByText('Please check the input')).toBeInTheDocument();
  });

  test('fetches different data based on endpoint parameter', async () => {
    const container2 = document.createElement('div');
    document.body.appendChild(container2);

    act(() => {
      render(
        <TestApp
          iso={successIso}
          endpoint='orders'
        />, container)
    });

    expect(await screen.findByText(/Total number of arrived orders: 9/i)).toBeInTheDocument();

    act(() => {
      render(
        <TestApp
          iso={successIso}
          endpoint='overall'
        />, container)
    });

    expect(await screen.findByText(/Vaccines that have expired overall: 1837/i)).toBeInTheDocument();
  });

})
