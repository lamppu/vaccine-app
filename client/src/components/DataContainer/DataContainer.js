import React from 'react';
import './DataContainer.css';
import DoughnutChart from '../DoughnutChart/DoughnutChart.js';

const DataContainer = ({dateTimeString, orders}) => {
  if (dateTimeString !== '') {
    const arr = dateTimeString.split('T');
    const d = new Date(arr[0]);
    const date = d.toDateString();
    const time = arr[1].substr(0,(arr[1].length-1));

    const producers = ['Zerpfy', 'Antiqua', 'SolarBuddhica'];
    const prodData = [orders.zerpfyOrders, orders.antiquaOrders, orders.solarBuddhicaOrders];
    const districts = ['HYKS', 'KYS', 'OYS', 'TAYS', 'TYKS'];
    const distrData = [orders.hyksOrders, orders.kysOrders, orders.oysOrders, orders.taysOrders, orders.tyksOrders];
    return (
      <div>
        <h2>On {date} by {time}</h2>
        <h3>Arrived orders and vaccines:</h3>
        <div className='flexContainer'>
          <div>
            <p>Total number of orders: {orders.orders}</p>
            <p>Total number of vaccines: {orders.vaccines}</p>
          </div>
          <DoughnutChart
            orders={orders.orders}
            dataArr={prodData}
            labelsArr={producers}
            title={'Orders per producer'}
          />
          <DoughnutChart
            orders={orders.orders}
            dataArr={distrData}
            labelsArr={districts}
            title={'Orders per district'}
          />
        </div>

      </div>
    )
  }
  return null;

}

export default DataContainer;
