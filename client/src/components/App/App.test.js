import { render, screen, fireEvent } from '@testing-library/react';
import { unmountComponentAtNode } from 'react-dom';
import { act } from "react-dom/test-utils";
import React from 'react';
import App from './App.js';
import UserEvent from '@testing-library/user-event';
import { successData, invalidDateData} from '../../utils/test_data.js';

let container = null;
const unmockedFetch = global.fetch;

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);

  global.fetch = jest.fn((url) => {
    const ep = url.slice(5,-33);
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

describe('Testing App rendering with initial state', () => {

  test('renders the app heading', async () => {
    act(() => {
      render(<App />, container);
    });
    expect(await screen.findByText(/Vaccine App/)).toBeInTheDocument();
  });

  test('renders input for date', async () => {
    act(() => {
      render(<App />, container);
    });
    expect(await screen.findByTestId('dateInput')).toBeInTheDocument();
  });

  test('renders input for time', async () => {
    act(() => {
      render(<App />, container);
    });
    expect(await screen.findByTestId('timeInput')).toBeInTheDocument();
  });

  test('renders data container', async () => {
    act(() => {
      render(<App />, container);
    });
    expect(await screen.findByText(/Arrived orders and vaccines:/i)).toBeInTheDocument();
  });

});

describe('Testing App rendering with user events and different types of fetch data', () => {

  test("shows correct date and time after user inputs them", async () => {
    act(() => {
      render(<App />, container);
    });

    const dateInput = screen.getByTestId('dateInput').firstChild;
    const timeInput = screen.getByTestId('timeInput').firstChild;

    UserEvent.type(dateInput, '2021-03-21');
    fireEvent.change(timeInput, {target: {value: '08:08:08'}});

    expect(timeInput.value).toBe('08:08:08');

    expect(await screen.findByText(/On Sun Mar 21 2021 by 08:08:08/i)).toBeInTheDocument();
  });

  test("shows error message if fetched data returns an error", async () => {
    jest.spyOn(global, 'fetch')
    .mockImplementation(() => Promise.resolve({ json: () => Promise.resolve(invalidDateData)}));

    act(() => {
      render(<App />, container);
    });
    expect(await screen.findByText('Invalid Date')).toBeInTheDocument();
  });

});
