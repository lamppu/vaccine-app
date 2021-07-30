import { render, screen } from '@testing-library/react';
import { unmountComponentAtNode } from 'react-dom';
import { act } from "react-dom/test-utils";
import React from 'react';
import DataContainer from './DataContainer.js';

const dt = '2021-04-01T23:59:59Z';
const data = {
  "success": true,
  "data": {
    "ordersData": {
      "orders": 41,
      "zerpfyOrders": 15,
      "antiquaOrders": 13,
      "solarBuddhicaOrders": 13,
      "hyksOrders": 17,
      "kysOrders": 4,
      "oysOrders": 4,
      "taysOrders": 9,
      "tyksOrders": 7,
      "vaccines": 205,
      "zerpfyVaccines": 75,
      "antiquaVaccines": 52,
      "solarBuddhicaVaccines": 78,
      "hyksVaccines": 89,
      "kysVaccines": 19,
      "oysVaccines": 19,
      "taysVaccines": 44,
      "tyksVaccines": 34
    },
    "vaccinationsData": {
      "vaccinations": 101,
      "zerpfyVaccinations": 35,
      "antiquaVaccinations": 31,
      "solarBuddhicaVaccinations": 35,
      "hyksVaccinations": 39,
      "kysVaccinations": 13,
      "oysVaccinations": 15,
      "taysVaccinations": 20,
      "tyksVaccinations": 14,
      "femaleVaccinations": 33,
      "maleVaccinations": 45,
      "nonbinaryVaccinations": 23
    }
  },
  "error": null
}

describe('Testing DataContainer rendering with a specific datetime value', () => {
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

  test('renders data container header "On Thu Apr 01 2021 by 23:59:59"', () => {
    act(() => {
      render(<DataContainer
        dateTimeString={dt}
        dataset1={data}
        data-testid='dataCont'
      />, container)
    });

    expect(screen.queryByText('On Thu Apr 01 2021 by 23:59:59')).toBeInTheDocument();
  });

  test('shows the correct number of orders', () => {
    act(() => {
      render(<DataContainer
        dateTimeString={dt}
        dataset1={data}
        data-testid='dataCont'
      />, container)
    });

    expect(screen.queryByText('Total number of orders: 41')).toBeInTheDocument();
  });
})
