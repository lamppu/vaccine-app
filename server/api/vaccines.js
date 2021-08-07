const addDays = require('./utils').addDays;
const addMillisecond = require('./utils').addMillisecond;
const queryVaccinationsFromOrders = require('./utils').queryVaccinationsFromOrders;
const queryInjections = require('./utils').queryInjections;
const queryOrders = require('./utils').queryOrders;

/*
The function returns:
- the total number of arrived vaccines that have arrived and have been used on requested date
- the total amount of bottles that have expired on the requested day by the requested time
- the total amount of vaccines that have expired before usage by requested datetime (since January 2nd)
- total number of vaccines that are going to expire in the next ten days (starting from one millisecond after requested datetime and ending ten days after that )
- how many vaccines are left to use

*/

// endTS is the datetime requested by the user and beginTS is the beginning (time is 00:00:00) of that requested day
const vaccines = async (beginTS, endTS) => {
  /* ---- Dates that are needed for the queries --- */

  // The first date with data
  const firstDate = new Date('2021-01-02T00:00:00Z');

  // A corresponding timeframe 30 days ago
  const monthAgoBeginTS = addDays(beginTS, -30);
  const monthAgoEndTS = addDays(endTS, -30);

  // Orders arrived since notExpiredBeginTS have not expired yet
  let notExpiredBeginTS = addMillisecond(monthAgoEndTS);

  // The begin arrival date of the bottles that are going to expire in the next ten days
  const tenDayExpBegin = addDays(addMillisecond(endTS), -30);
  // The end arrival date of the bottles that are going to expire in the next ten days
  const tenDayExpEnd = addDays(tenDayExpBegin, 10);

  /* ---- Vaccine and vaccination data needed for calculations and evaluations ---- */

  // All vaccines that have arrived between firstDate and monthAgoEndTS
  const vaccinesFromBeginning = (monthAgoEndTS.getTime() < firstDate.getTime() || monthAgoEndTS.getTime() == firstDate.getTime()) ? 0 : await queryInjections(firstDate, monthAgoEndTS);

  // All vaccinations that have been given between firstDate and the requested endTS
  // from the bottles that have arrived between firstDate and monthAgoEndTS
  const vaccinationsFromBeginning = (vaccinesFromBeginning === 0) ? 0 : await queryVaccinationsFromOrders(firstDate, endTS, firstDate, monthAgoEndTS);

  // All vaccines that have arrived between notExpiredBeginTS and endTS
  const vaccinesFromNotExpired = await queryInjections(notExpiredBeginTS, endTS);
  // All vaccinations that have been given from the bottles that have arrived between notExpiredBeginTS and endTS
  const vaccinationsFromNotExpired = await queryVaccinationsFromOrders(notExpiredBeginTS, endTS, notExpiredBeginTS, endTS);
  // Bottles that have expired on the requested day by the requested time
  const expiredBottles = await queryOrders(monthAgoBeginTS, monthAgoEndTS);
  // All vaccines from bottles that are going to expire in the next ten days
  const tenDayVaccines = await queryInjections(tenDayExpBegin, tenDayExpEnd);
  // All vaccinations that have been used so far from the bottles that are going to expire in the next ten days
  const tenDayVaccinations = await queryVaccinationsFromOrders(firstDate, endTS, tenDayExpBegin, tenDayExpEnd)

  const data = {
    "usedArrived": await queryVaccinationsFromOrders(beginTS, endTS, beginTS, endTS),
    "leftToUse": vaccinesFromNotExpired - vaccinationsFromNotExpired,
    "totalVaccinesInExpiredBottles": (expiredBottles === 0) ? 0 : await queryInjections(monthAgoBeginTS, monthAgoEndTS),
    "vaccinationsFromExpiredBottles": (expiredBottles === 0) ? 0 : await queryVaccinationsFromOrders(monthAgoBeginTS, endTS, monthAgoBeginTS, monthAgoEndTS),
    "expiredBottles": expiredBottles,
    "vaccinesFromBeginning": vaccinesFromBeginning,
    "vaccinationsFromBeginning": vaccinationsFromBeginning,
    "expiredVaccinesOverall": (vaccinesFromBeginning-vaccinationsFromBeginning),
    "expiresInTenDays": tenDayVaccines - tenDayVaccinations
  };
  return data;
}
module.exports = vaccines;
