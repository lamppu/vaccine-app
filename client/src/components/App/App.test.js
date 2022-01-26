import { render, screen, fireEvent } from '@testing-library/react';
import { unmountComponentAtNode } from 'react-dom';
import { act } from "react-dom/test-utils";
import React from 'react';
import App from './App.js';
import UserEvent from '@testing-library/user-event';
import { successData, invalidDateData} from '../../utils/test_data.js';

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

describe('Testing App rendering with initial state', () => {

  test('renders the app heading', async () => {
    jest.spyOn(global, 'fetch')
    .mockImplementation(() => Promise.resolve({ json: () => Promise.resolve(successData)}));

    act(() => {
      render(<App />, container);
    });

    const h1Element = await screen.findByText(/Vaccine App/);
    expect(h1Element).toBeInTheDocument();
  });

  test('renders input for date', async () => {
    jest.spyOn(global, 'fetch')
    .mockImplementation(() => Promise.resolve({ json: () => Promise.resolve(successData)}));

    act(() => {
      render(<App />, container);
    });
    expect(await screen.findByTestId('dateInput')).toBeInTheDocument();
  });

  test('renders input for time', async () => {
    jest.spyOn(global, 'fetch')
    .mockImplementation(() => Promise.resolve({ json: () => Promise.resolve(successData)}));

    act(() => {
      render(<App />, container);
    });
    expect(await screen.findByTestId('timeInput')).toBeInTheDocument();
  });

  test('renders input for microseconds', async () => {
    jest.spyOn(global, 'fetch')
    .mockImplementation(() => Promise.resolve({ json: () => Promise.resolve(successData)}));

    act(() => {
      render(<App />, container);
    });
    expect(await screen.findByTestId('microsInput')).toBeInTheDocument();
  });

  test('renders data container', async () => {
    jest.spyOn(global, 'fetch')
    .mockImplementation(() => Promise.resolve({ json: () => Promise.resolve(successData)}));

    act(() => {
      render(<App />, container);
    });
    expect(await screen.findByText(/Arrived orders and vaccines:/i)).toBeInTheDocument();
  });

});

describe('Testing App rendering with user events and different types of fetch data', () => {

  test("shows correct date and time after user inputs them", async () => {
    jest.spyOn(global, 'fetch')
    .mockImplementation(() => Promise.resolve({ json: () => Promise.resolve(successData)}));

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
