import React, { useEffect, useState } from 'react';
import './DataContainer.css';
import DoughnutChart from '../DoughnutChart/DoughnutChart.js';
import Expirations from '../Expirations/Expirations.js';
import { producers, districts, genders } from '../../utils/lists.js';
import { validateIso } from '../../utils/validate_iso.js';

const DataContainer = ({iso, error, onErrorChange}) => {
  const [dataset, setDataset] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const datasetUrl = 'http://localhost:3001/data?date=' + iso;
        let result = await fetch(datasetUrl);
        result = await result.json();
        if (result) {
          setDataset(result);
          onErrorChange({error: !result.success, msg: result.error})
        }
      } catch (e) {
          onErrorChange({error: true, msg: 'Unable to connect to server'})
      }
    }
    const validation = validateIso(iso);
    if (validation.valid) {
      fetchData();
    } else {
      onErrorChange({error: true, msg: validation.msg});
    }
  }, [iso, onErrorChange])

  if (dataset && !error.error) {
    try {
      const arr = iso.split('T');
      let date = new Date(arr[0]);
      date = date.toDateString();
      const time = arr[1].replace('Z', '');

      const orders = dataset.data.ordersData;
      const ordersPerProd = [orders.zerpfyOrders, orders.antiquaOrders, orders.solarBuddhicaOrders];
      const ordersPerDistr = [orders.hyksOrders, orders.kysOrders, orders.oysOrders, orders.taysOrders, orders.tyksOrders];

      const vaccinations = dataset.data.vaccinationsData;
      const vaccsPerProd = [vaccinations.zerpfyVaccinations, vaccinations.antiquaVaccinations, vaccinations.solarBuddhicaVaccinations];
      const vaccsPerDistr = [vaccinations.hyksVaccinations, vaccinations.kysVaccinations, vaccinations.oysVaccinations, vaccinations.taysVaccinations, vaccinations.tyksVaccinations];
      const vaccsPerGender = [vaccinations.femaleVaccinations,vaccinations.maleVaccinations, vaccinations.nonbinaryVaccinations];

      const stats = dataset.data.vaccineData;

      return (
        <div data-testid='dataCont'>
          <h2>On {date} by {time}</h2>
          <div className='GridContainer'>
            <div className='GridItem'>
              <h3>Arrived orders and vaccines:</h3>
              <p className='Data'>
                Total number of arrived orders: {orders.orders}<br />
                Total number of arrived vaccines: {orders.vaccines}
              </p>
              <div className='FlexContainer1'>
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
              <p className='Data'>Total number of vaccinations: {vaccinations.vaccinations}</p>
              <div className='FlexContainer2'>
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
              <h3>Expiring bottles and vaccines:</h3>
              <Expirations stats={stats}/>
            </div>
            <div className='GridItem'>
              <h3>Vaccines:</h3>
              <p className='Data'>
                Used vaccines out of the vaccines that have arrived on this day: {stats.usedArrived}<br />
                Vaccines that are left to use: {stats.leftToUse}
              </p>
            </div>
          </div>
        </div>
      )
    } catch (e) {
      return null;
    }

  }
  return null;

}

export default DataContainer;
