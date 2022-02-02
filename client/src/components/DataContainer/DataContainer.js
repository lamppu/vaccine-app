import React from 'react';
import './DataContainer.css';
import DoughnutChart from '../DoughnutChart/DoughnutChart.js';
import DataBlock from '../DataBlock/DataBlock.js';

const DataContainer = ({iso, error, onErrorChange}) => {

  const getOrdersContents = (data) => {
    if (data.orders === 0) {
      return (
        <div className='GridItem'>
          <h3>Arrived orders and vaccines:</h3>
          <p className='Data'>
            No orders have arrived on this day by the requested time
          </p>
        </div>
      )
    }
    return (
      <div className='GridItem'>
        <h3>Arrived orders and vaccines:</h3>
        <p className='Data'>
          Total number of arrived orders: {data.orders}<br />
          Total number of arrived vaccines: {data.vaccines}
        </p>
        <div className='FlexContainer1'>
          <DoughnutChart
            total={data.orders}
            dataArr={data.ordersByProducer}
            labelsArr={data.producers}
            title={'Orders per producer'}
          />
          <DoughnutChart
            total={data.orders}
            dataArr={data.ordersByDistrict}
            labelsArr={data.districts}
            title={'Orders per district'}
          />
        </div>
      </div>
    )
  }

  const getVaccinationsContents = (data) => {

    if(data.vaccinations === 0) {
      return (
        <div className='GridItem'>
          <h3>Vaccinations:</h3>
          <p className='Data'>
            No vaccinations have been done on this day by the requested time
          </p>
        </div>
      )
    }
    return (
      <div className='GridItem'>
        <h3>Vaccinations:</h3>
        <p className='Data'>
          Total number of vaccinations: {data.vaccinations} <br />
          Vaccinations given from orders that have arrived on this day: {data.vaccinationsFromArrived}
        </p>

        <div className='FlexContainer2'>
          <DoughnutChart
            total={data.vaccinations}
            dataArr={data.vaccinationsByProducer}
            labelsArr={data.producers}
            title={'Vaccinations per producer'}
          />
          <DoughnutChart
            total={data.vaccinations}
            dataArr={data.vaccinationsByDistrict}
            labelsArr={data.districts}
            title={'Vaccinations per district'}
          />
          <DoughnutChart
            total={data.vaccinations}
            dataArr={data.vaccinationsByGender}
            labelsArr={data.genders}
            title={'Vaccinations per gender'}
          />
        </div>
      </div>
    )
  }

  const percentage = (a, b) => {
    return Math.round(a/b*10000)/100;
  }

  const getExpirationsContents = (data) => {

    let thisDay;
    if(data.expiredBottles === 0) {
      thisDay = <p>No bottles have expired on this day</p>;
    } else {
      const expVaccPercentage = percentage(data.expiredVaccines, data.totalVaccinesInExpiredBottles);

      thisDay = <p>
        Expired bottles: {data.expiredBottles}<br />
        Expired vaccines: {data.expiredVaccines}<br />
        Vaccinations given before expiration: {data.vaccinationsFromExpiredBottles}<br />
        Spoilage rate: {expVaccPercentage}%
      </p>
    }

    return (
      <div className='GridItem2'>
        <h4>On this day:</h4>
        {thisDay}
      </div>
    )
  }

  const getOverallContents = (data) =>  {

    let overall;
    if(data.expiredVaccinesOverall === 0) {
      overall = <p>No vaccines have expired overall</p>;
    } else {
      const expVaccPercentageTotal = percentage(data.expiredVaccinesOverall, data.vaccinesFromBeginning);
      overall = <p>
        Vaccines that have expired overall: {data.expiredVaccinesOverall}<br />
        Vaccinations given before expiration of bottles: {data.vaccinationsFromBeginning}<br />
        Spoilage rate: {expVaccPercentageTotal}%
      </p>;
    }

    return (
      <div className='GridItem2'>
        <h4>Overall:</h4>
        {overall}
      </div>
    )
  }

  const getNextTenDaysContents = (data) => {
    const tenDays = (data.expiresInTenDays === 0) ? <p>No vaccines will expire in the next ten days</p> : <p>Vaccines that will expire in the next ten days: {data.expiresInTenDays}</p>;

    return (
      <div className='GridItem2'>
        <h4>Next ten days:</h4>
        {tenDays}
      </div>
    )
  }

  const getLeftToUseContents = (data) => {
    const left = (data.leftToUse === 0) ? <p>There are no vaccines left to use</p> : <p>Vaccines that are left to use: {data.leftToUse}</p>;
    return (
      <div className='GridItem2'>
        <h4>Left to use:</h4>
        {left}
      </div>
    )
  }

  if (!error.error) {
    try {
      const arr = iso.split('T');
      let date = new Date(arr[0]);
      date = date.toDateString();
      const time = ((arr[1]).split('.'))[0].replace('Z', '');

      return (
        <div data-testid='dataCont'>
          <h2>On {date} by {time}</h2>
          <div className='GridContainer'>
            <DataBlock
              iso={iso}
              error={error}
              onErrorChange={onErrorChange}
              endpoint='orders'
              getContents={getOrdersContents}
            />
            <DataBlock
              iso={iso}
              error={error}
              onErrorChange={onErrorChange}
              endpoint='vaccinations'
              getContents={getVaccinationsContents}
            />
            <div className='GridItem'>
              <h3>Expiring bottles and vaccines:</h3>
              <div className='ExpGridContainer'>
                <DataBlock
                  iso={iso}
                  error={error}
                  onErrorChange={onErrorChange}
                  endpoint='expiredbottles'
                  getContents={getExpirationsContents}
                />
                <DataBlock
                  iso={iso}
                  error={error}
                  onErrorChange={onErrorChange}
                  endpoint='overall'
                  getContents={getOverallContents}
                />
                <DataBlock
                  iso={iso}
                  error={error}
                  onErrorChange={onErrorChange}
                  endpoint='nexttendays'
                  getContents={getNextTenDaysContents}
                />
                <DataBlock
                  iso={iso}
                  error={error}
                  onErrorChange={onErrorChange}
                  endpoint='lefttouse'
                  getContents={getLeftToUseContents}
                />
              </div>
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
