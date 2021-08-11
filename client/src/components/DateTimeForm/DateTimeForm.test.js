import { render, screen, fireEvent } from '@testing-library/react';
import { unmountComponentAtNode } from 'react-dom';
import { act } from "react-dom/test-utils";
import React, { useState } from 'react';
import UserEvent from '@testing-library/user-event';
import DateTimeForm from './DateTimeForm.js';

const TestApp = () => {
  const [dateTimeString, setDateTimeString] = useState('');
  const [dataset, setDataset] = useState({"success": null, "data": null, "error": null});
  return (
    <div>
      <DateTimeForm
        onDateTimeStringChange={setDateTimeString}
        onDatasetChange={setDataset}
      />
      <p data-testid='dts'>{dateTimeString}</p>
      <p data-testid='dataset'>{dataset.data}</p>
      <p data-testid='error'>{dataset.error}</p>
    </div>
  )
}

describe('Testing DateTimeForm', () => {
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

  test('renders date input', () => {
    act(() => {
      render(<TestApp />, container)
    });
    expect(screen.getByTestId('dateInput')).toBeInTheDocument();
  });

  test('clicking submit button changes the dataset value', async () => {
    const res = {
      "success": true,
      "data": "hello",
      "error": null
    }

    jest.spyOn(global, 'fetch')
    .mockImplementation(() => Promise.resolve({ json: () => Promise.resolve(res)}));

    act(() => {
      render(<TestApp />, container)
    });

    const data = screen.getByTestId('dataset');
    expect(data).toBeInTheDocument();
    expect(data.textContent).toBe('');

    const submitButton = screen.getByText('Show data for chosen date');
    UserEvent.click(submitButton);
    await screen.findByText('hello');
    expect(data.textContent).toBe('hello');
  });

  test('clicking submit button changes the dateTimeString value', async () => {
    const res = {
      "success": true,
      "data": "hello",
      "error": null
    }

    jest.spyOn(global, 'fetch')
    .mockImplementation(() => Promise.resolve({ json: () => Promise.resolve(res)}));

    act(() => {
      render(<TestApp />, container)
    });

    const dt = screen.getByTestId('dts');
    expect(dt).toBeInTheDocument();
    expect(dt.textContent).toBe('');

    const submitButton = screen.getByText('Show data for chosen date');
    UserEvent.click(submitButton);
    await screen.findByText('2021-01-02T23:59:59.999999Z');
    expect(dt.textContent).toBe('2021-01-02T23:59:59.999999Z');
  });

  test('submitting form with empty date input results in error', async () => {
    act(() => {
      render(<TestApp />, container)
    });

    const err = screen.getByTestId('error');
    expect(err.textContent).toBe('');

    const dateInput = screen.getByTestId('dateInput').firstChild;
    expect(dateInput).toBeInTheDocument();

    UserEvent.clear(dateInput);

    const submitButton = screen.getByText('Show data for chosen date');
    UserEvent.click(submitButton);

    await screen.findByText('Please select a date');
    expect(err.textContent).toBe('Please select a date');
  });

  test('submitting form with faulty microseconds input results in error', async () => {
    act(() => {
      render(<TestApp />, container)
    });

    const err = screen.getByTestId('error');
    expect(err.textContent).toBe('');

    const timeInput = screen.getByTestId('timeInput').firstChild;
    const microsInput = screen.getByTestId('microsInput').firstChild;

    fireEvent.change(timeInput, {target: {value: '04:04:04'}});
    fireEvent.change(microsInput, {target: {value: '86349k'}});

    const submitButton = screen.getByText('Show data for chosen date');
    UserEvent.click(submitButton);

    await screen.findByText('Please choose a valid value in microseconds input (000000-999999)');
    expect(err.textContent).toBe('Please choose a valid value in microseconds input (000000-999999)');
  });

  test('submitting form with empty time input when microseconds have been changed results in error', async () => {
    act(() => {
      render(<TestApp />, container)
    });

    const err = screen.getByTestId('error');
    expect(err.textContent).toBe('');

    const microsInput = screen.getByTestId('microsInput').firstChild;
    fireEvent.change(microsInput, {target: {value: '863492'}});

    const submitButton = screen.getByText('Show data for chosen date');
    UserEvent.click(submitButton);

    await screen.findByText('Please select a time');
    expect(err.textContent).toBe('Please select a time');
  });

  test('hovering over info button shows text', async () => {
    act(() => {
      render(<TestApp />, container)
    });
    expect(screen.queryByText(/The dates are treated/i)).not.toBeInTheDocument();

    const icon = screen.getByTestId('icon');
    expect(icon).toBeInTheDocument();

    UserEvent.hover(icon);

    const popup = await screen.findByText(/The dates are treated/i);
    expect(popup).toBeInTheDocument();
  });

});
