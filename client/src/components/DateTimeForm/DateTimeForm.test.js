import { render, screen } from '@testing-library/react';
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
    await screen.findByText('2021-01-02T23:59:59Z');
    expect(dt.textContent).toBe('2021-01-02T23:59:59Z');
  });

  test('submitting form with empty input results in error', async () => {
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

    await screen.findByText('No date selected');
    expect(err.textContent).toBe('No date selected');
  });

  test('hovering over info button shows text', async () => {
    act(() => {
      render(<TestApp />, container)
    });
    expect(screen.queryByText(/Please note/i)).not.toBeInTheDocument();

    const icon = screen.getByTestId('icon');
    expect(icon).toBeInTheDocument();

    UserEvent.hover(icon);

    const popup = await screen.findByText(/Please note/i);
    expect(popup).toBeInTheDocument();
  });

});
