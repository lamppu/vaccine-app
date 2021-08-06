const Vaccination = require('../models/bookshelf/vaccination.js');
const Order = require('../models/bookshelf/order.js');
const getNewDate = require('./utils').getNewDate;
/*
+ The total number of arrived vaccines that have been used on requested date
- How many vaccines are left to use
++ The total amount of bottles that have expired on the requested date
+ The total amount of vaccines that expired before usage by requested date
- Total number of vaccines that are going to expire in the next ten days
*/

const queryVaccination = async (start, end, subStart, subEnd) => {
  const subquery = await Order.whereBetween('arrived', subStart, subEnd).select('id').buildQuery();
  return await Vaccination.whereBetween('vaccinationDate', start, end).whereIn('sourceBottle', subquery.query).count();
}

const queryInjections = async (start, end) => {
  return (await Order.whereBetween('arrived', start, end).query().sum({injections: 'injections'}))[0].injections;
}

const vaccines = async (beginTS, endTS) => {
  const startDate = new Date('2021-01-02T00:00:00Z');
  const endDate = getNewDate(endTS, -30);
  const vaccinesFromBeginning = await queryInjections(startDate, endDate);
  const vaccinationsFromBeginning = await queryVaccination(startDate, endTS, startDate, endDate);


  const monthAgoBeginTS = getNewDate(beginTS, -30);
  const monthAgoEndTS = getNewDate(endTS, -30);


  const data = {
    "usedArrived": await queryVaccination(beginTS, endTS, beginTS, endTS),
    "leftToUse": null,
    "totalVaccinesInExpiredBottles": await queryInjections(monthAgoBeginTS, monthAgoEndTS),
    "vaccinationsFromExpiredBottles": await queryVaccination(monthAgoBeginTS, endTS, monthAgoBeginTS, monthAgoEndTS),
    "expiredBottles": await Order.whereBetween('arrived', monthAgoBeginTS, monthAgoEndTS).count(),
    "vaccinesFromBeginning": vaccinesFromBeginning,
    "vaccinationsFromBeginning": vaccinationsFromBeginning,
    "expiredVaccinesOverall": (vaccinesFromBeginning-vaccinationsFromBeginning),
    "expiresInTenDays": null
  };
  return data;
}
module.exports = vaccines;
