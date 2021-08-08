import React from 'react';

const percentage = (a, b) => {
  return Math.round(a/b*10000)/100;
}

const Expirations = ({stats}) => {
  const expVaccPercentage = (stats.totalVaccinesInExpiredBottles === 0) ? 0 : percentage(stats.expiredVaccines, stats.totalVaccinesInExpiredBottles);
  const expVaccPercentageTotal = (stats.vaccinesFromBeginning === 0) ? 0 : percentage(stats.expiredVaccinesOverall, stats.vaccinesFromBeginning);

  let thisDay;
  if(stats.expiredBottles === 0) {
    thisDay = <p>No bottles have expired on this day</p>;
  } else {
    thisDay = <p>
      Expired bottles: {stats.expiredBottles}<br />
      Expired vaccines: {stats.expiredVaccines}<br />
      Vaccinations given before expiration: {stats.vaccinationsFromExpiredBottles}<br />
      Spoilage rate: {expVaccPercentage}%
    </p>
  }

  let overall;
  if(stats.expiredVaccinesOverall === 0) {
    overall = <p>No vaccines have expired overall</p>;
  } else {
    overall = <p>
      Vaccines that have expired overall: {stats.expiredVaccinesOverall}<br />
      Vaccinations given before expiration of bottles: {stats.vaccinationsFromBeginning}<br />
      Spoilage rate: {expVaccPercentageTotal}%
    </p>;
  }
  const tenDays = (stats.expiresInTenDays === 0) ? <p>No vaccines will expire in the next ten days</p> : <p>Vaccines that will expire in the next ten days: {stats.expiresInTenDays}</p>;

  return (
    <div className='GridContainer'>
      <div className='GridItem2'>
        <h4>On this day:</h4>
        {thisDay}
      </div>
      <div className='GridItem2'>
        <h4>Overall:</h4>
        {overall}
      </div>
      <div className='GridItem2'>
        <h4>Next ten days:</h4>
        {tenDays}
      </div>
    </div>
  )
}

export default Expirations;
