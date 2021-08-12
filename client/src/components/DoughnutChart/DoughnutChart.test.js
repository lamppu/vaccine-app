import { render, screen } from '@testing-library/react';
import { unmountComponentAtNode } from 'react-dom';
import { act } from "react-dom/test-utils";
import React from 'react';
import DoughnutChart from './DoughnutChart.js';

describe('Testing DoughnutChart rendering', () => {
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

  test('renders chart', () => {
    act(() => {
      render(<DoughnutChart
        total={4}
        dataArr={[1,1,2]}
        labelsArr={['Zerpfy', 'Antiqua', 'SolarBuddhica']}
        title={'Orders per producer'}
      />, container)
    })
    expect(screen.getByTestId('doughnut')).toBeInTheDocument();
  });

  test('does not render chart when total is zero', () => {
    act(() => {
      render(<DoughnutChart
        total={0}
        dataArr={[0,0,0]}
        labelsArr={['Zerpfy', 'Antiqua', 'SolarBuddhica']}
        title={'Orders per producer'}
      />, container)
    })
    expect(screen.queryByTestId('doughnut')).not.toBeInTheDocument();
  });
})
