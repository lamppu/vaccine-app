import { render, screen } from '@testing-library/react';
import React from 'react';
import App from './App.js';

test('renders the app heading', () => {
  render(<App />);
  const h1Element = screen.getByText(/Vaccine App/i);
  expect(h1Element).toBeInTheDocument();
});
