import React from 'react';
import './DataContainer.css';
import DoughnutChart from '../DoughnutChart/DoughnutChart.js';

const DataContainer = ({dateTimeString, dataset1}) => {
  if (dateTimeString !== '' && dataset1.success) {
    const arr = dateTimeString.split('T');
    const d = new Date(arr[0]);
    const date = d.toDateString();
    const time = arr[1].substr(0,(arr[1].length-1));

    const producers = ['Zerpfy', 'Antiqua', 'SolarBuddhica'];
    const districts = ['HYKS', 'KYS', 'OYS', 'TAYS', 'TYKS'];
    const genders = ['female', 'male', 'nonbinary'];

    const orders = dataset1.data.ordersData;
    const ordersPerProd = [orders.zerpfyOrders, orders.antiquaOrders, orders.solarBuddhicaOrders];
    const ordersPerDistr = [orders.hyksOrders, orders.kysOrders, orders.oysOrders, orders.taysOrders, orders.tyksOrders];

    const vaccinations = dataset1.data.vaccinationsData;
    const vaccsPerProd = [vaccinations.zerpfyVaccinations, vaccinations.antiquaVaccinations, vaccinations.solarBuddhicaVaccinations];
    const vaccsPerDistr = [vaccinations.hyksVaccinations, vaccinations.kysVaccinations, vaccinations.oysVaccinations, vaccinations.taysVaccinations, vaccinations.tyksVaccinations];
    const vaccsPerGender = [vaccinations.femaleVaccinations,vaccinations.maleVaccinations, vaccinations.nonbinaryVaccinations];
    return (
      <div data-testid='dataCont'>
        <h2>On {date} by {time}</h2>
        <div className='GridContainer'>
          <div className='GridItem'>
            <h3>Arrived orders and vaccines:</h3>
            <p>Total number of orders: {orders.orders}</p>
            <p>Total number of vaccines: {orders.vaccines}</p>
            <div className='FlexContainer'>
              <DoughnutChart
                total={orders.orders}
                dataArr={ordersPerProd}
                labelsArr={producers}
                title={'Orders per producer'}
              />
              <DoughnutChart
                total={orders.orders}
                dataArr={ordersPerDistr}
                labelsArr={districts}
                title={'Orders per district'}
              />
            </div>
          </div>
          <div className='GridItem'>
            <h3>Vaccinations:</h3>
            <p>Total number of vaccinations: {vaccinations.vaccinations}</p>
            <div className='FlexContainer'>
              <DoughnutChart
                total={vaccinations.vaccinations}
                dataArr={vaccsPerProd}
                labelsArr={producers}
                title={'Vaccinations per producer'}
              />
              <DoughnutChart
                total={vaccinations.vaccinations}
                dataArr={vaccsPerDistr}
                labelsArr={districts}
                title={'Vaccinations per district'}
              />
              <DoughnutChart
                total={vaccinations.vaccinations}
                dataArr={vaccsPerGender}
                labelsArr={genders}
                title={'Vaccinations per gender'}
              />
            </div>
          </div>
          <div className='GridItem'>
            Vaccine data here
          </div>
          <div className='GridItem'>
            Expiration data here
          </div>
        </div>


      </div>
    )
  }
  return null;

}

export default DataContainer;
