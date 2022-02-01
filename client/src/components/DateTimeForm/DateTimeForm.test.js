import { render, screen, fireEvent } from '@testing-library/react';
import { unmountComponentAtNode } from 'react-dom';
import { act } from "react-dom/test-utils";
import React, { useState } from 'react';
import UserEvent from '@testing-library/user-event';
import DateTimeForm from './DateTimeForm.js';

const TestApp = () => {
  const [iso, setIso] = useState('2021-01-02T23:59:59.999999Z');

  return (
    <div>
      <DateTimeForm
        onIsoChange={setIso}
      />
      <p data-testid='iso'>{iso}</p>
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

  test('renders time input', () => {
    act(() => {
      render(<TestApp />, container)
    });
    expect(screen.getByTestId('timeInput')).toBeInTheDocument();
  });

  test('changing date input value changes ISO datestring value', () => {
    act(() => {
      render(<TestApp />, container)
    });

    const iso = screen.getByTestId('iso');
    expect(iso).toBeInTheDocument();
    expect(iso.textContent).toBe('2021-01-02T23:59:59.999999Z');

    const dateInput = screen.getByTestId('dateInput').firstChild;
    UserEvent.type(dateInput, '2021-03-20');

    expect(iso.textContent).toBe('2021-03-20T23:59:59.999999Z');
  });

  test('changing time input value changes ISO datestring value', () => {
    act(() => {
      render(<TestApp />, container)
    });

    const iso = screen.getByTestId('iso');
    expect(iso.textContent).toBe('2021-01-02T23:59:59.999999Z');

    const timeInput = screen.getByTestId('timeInput').firstChild;
    fireEvent.change(timeInput, {target: {value: '04:04:04'}});

    expect(iso.textContent).toBe('2021-01-02T04:04:04.999999Z');
  });

  test('clearing date input will result in error message "Please select a date"', () => {
    act(() => {
      render(<TestApp />, container)
    });

    const dateInput = screen.getByTestId('dateInput').firstChild;
    UserEvent.clear(dateInput);

    expect(screen.queryByText('Please select a date')).toBeInTheDocument();
  });

  test('clearing time input will result in setting the time to value 00:00:00', () => {
    act(() => {
      render(<TestApp />, container)
    });

    const iso = screen.getByTestId('iso');
    expect(iso.textContent).toBe('2021-01-02T23:59:59.999999Z');

    const timeInput = screen.getByTestId('timeInput').firstChild;
    UserEvent.clear(timeInput);

    expect(iso.textContent).toBe('2021-01-02T00:00:00.999999Z');
  });

  test('inserting a date value outside of the asked range will result in error message "Please select a date between January 2nd and May 12th 2021"', () => {
    act(() => {
      render(<TestApp />, container)
    });

    const dateInput = screen.getByTestId('dateInput').firstChild;
    UserEvent.type(dateInput, '2022-02-14');

    expect(screen.queryByText('Please select a date between January 2nd and May 12th 2021')).toBeInTheDocument();
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
