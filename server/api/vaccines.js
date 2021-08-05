const Vaccination = require('../models/bookshelf/vaccination.js');
const Order = require('../models/bookshelf/order.js');
const getNewDate = require('./utils').getNewDate;
/*
- The total number of arrived vaccines that have been used on requested date
- How many vaccines are left to use
- The total amount of bottles that have expired on the requested date
- The total amount of vaccines that expired before usage by requested date
- Total number of vaccines that are going to expire in the next ten days
*/

const queryVaccination = async (start, end, subStart, subEnd) => {
  const subquery = await Order.whereBetween('arrived', subStart, subEnd).select('id').buildQuery();
  return await Vaccination.whereBetween('vaccinationDate', start, end).whereIn('sourceBottle', subquery.query).count();
}

const vaccines = async (beginTS, endTS) => {
  const startDate = new Date('2021-01-02T00:00:00Z');
  const endDate = getNewDate(endTS, -30);
  const vaccines = (await Order.whereBetween('arrived', startDate, endDate).query().sum({injections: 'injections'}))[0].injections;
  const vaccinations = await queryVaccination(startDate, endTS, startDate, endDate);

  const data = {
    "usedArrived": await queryVaccination(beginTS, endTS, beginTS, endTS),
    "leftToUse": null,
    "expiredBottles": null,
    "vaccines": vaccines,
    "vaccinations": vaccinations,
    "expiredVaccinesOverall": (vaccines-vaccinations),
    "expiresInTenDays": null
  };
  return data;
}
module.exports = vaccines;
