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
});

describe('Testing App rendering when changing state with user events', () => {
  test('renders data container after button click', async () => {
    jest.spyOn(global, 'fetch')
    .mockImplementation(() => Promise.resolve({ json: () => Promise.resolve(successData)}));

    act(() => {
      render(<App />, container);
    });

    let dataCont = screen.queryByTestId('dataCont');
    expect(dataCont).not.toBeInTheDocument();

    const submitButton = screen.getByText('Show data for chosen date');
    UserEvent.click(submitButton);

    dataCont = await screen.findByTestId('dataCont');
    expect(dataCont).toBeInTheDocument();
  });

  test("shows typed in date and time in the data container's header after submit", async () => {
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

    const submitButton = screen.getByText('Show data for chosen date');
    UserEvent.click(submitButton);

    const dataCont = await screen.findByTestId('dataCont');
    expect(dataCont).toBeInTheDocument();

    expect(dataCont.firstChild.textContent).toBe('On Sun Mar 21 2021 by 08:08:08');
  });

  test("renders error container when date and time inputs are cleared", async () => {

    act(() => {
      render(<App />, container);
    });

    let errCont = screen.queryByTestId('errorCont');
    expect(errCont).not.toBeInTheDocument();

    const dateInput = screen.getByTestId('dateInput').firstChild;
    const timeInput = screen.getByTestId('timeInput').firstChild;

    UserEvent.clear(dateInput);
    UserEvent.clear(timeInput);

    const submitButton = screen.getByText('Show data for chosen date');
    UserEvent.click(submitButton);

    errCont = await screen.findByTestId('errorCont');

    expect(errCont.textContent).toBe('No date selected');
  });

  test("renders error container if fetched data returns an error", async () => {
    jest.spyOn(global, 'fetch')
    .mockImplementation(() => Promise.resolve({ json: () => Promise.resolve(invalidDateData)}));

    act(() => {
      render(<App />, container);
    });

    let errCont = screen.queryByTestId('errorCont');
    expect(errCont).not.toBeInTheDocument();

    const submitButton = screen.getByText('Show data for chosen date');
    UserEvent.click(submitButton);

    errCont = await screen.findByTestId('errorCont');

    expect(errCont.textContent).toBe('Invalid Date');
  });

  test("doesn't render data container if fetched data returns an error", async () => {
    jest.spyOn(global, 'fetch')
    .mockImplementation(() => Promise.resolve({ json: () => Promise.resolve(invalidDateData)}));

    act(() => {
      render(<App />, container);
    });

    const submitButton = screen.getByText('Show data for chosen date');
    UserEvent.click(submitButton);

    const errCont = await screen.findByTestId('errorCont');
    expect(errCont).toBeInTheDocument();

    expect(screen.queryByTestId('dataCont')).not.toBeInTheDocument();
  });

});
