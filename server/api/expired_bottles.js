const addDays = require('./utils').addDays;
const queryVaccinationsFromOrders = require('./utils').queryVaccinationsFromOrders;
const queryInjections = require('./utils').queryInjections;
const queryOrders = require('./utils').queryOrders;

/*
This module returns:
- the total amount of vaccines that have originally been in the expired bottles
- vaccinations that have been made from the expired bottles before expiration
- the total amount of bottles that have expired on the requested day by the requested time
- the total amount of vaccines that have expired on the requested day by the requested time
*/

const expiredBottles = async (reqTS) => {
  const beginTS = reqTS.substring(0, 10) + ' 00:00:00.000000';
  // A corresponding timeframe 30 days ago
  const monthAgoBeginTS = addDays(beginTS, -30);
  const monthAgoEndTS = addDays(reqTS, -30);

  // Bottles that have expired on the requested day by the requested time
  const expiredBottles = await queryOrders(monthAgoBeginTS, monthAgoEndTS);
  const totalVaccinesInExpiredBottles =  (expiredBottles === 0) ? 0 : await queryInjections(monthAgoBeginTS, monthAgoEndTS);
  const vaccinationsFromExpiredBottles = (expiredBottles === 0) ? 0 : await queryVaccinationsFromOrders(monthAgoBeginTS, reqTS, monthAgoBeginTS, monthAgoEndTS);

  const data = {
    "totalVaccinesInExpiredBottles": totalVaccinesInExpiredBottles,
    "vaccinationsFromExpiredBottles": vaccinationsFromExpiredBottles,
    "expiredBottles": expiredBottles,
    "expiredVaccines": totalVaccinesInExpiredBottles - vaccinationsFromExpiredBottles
  };
  return data;
}
module.exports = expiredBottles;
