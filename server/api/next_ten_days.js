const addDays = require('./utils').addDays;
const addMicrosecond = require('./utils').addMicrosecond;
const queryVaccinationsFromOrders = require('./utils').queryVaccinationsFromOrders;
const queryInjections = require('./utils').queryInjections;
/*
This module returns:
- total number of vaccines that are going to expire in the next ten days
*/

const nextTenDays = async (reqTS) => {
  // The first date with data
  const firstDate = '2021-01-02 00:00:00.000000';

  // The begin arrival date of the bottles that are going to expire in the next ten days
  const tenDayExpBegin = addDays(addMicrosecond(reqTS), -30);
  // The end arrival date of the bottles that are going to expire in the next ten days
  const tenDayExpEnd = addDays(tenDayExpBegin, 10);


  // All vaccines from bottles that are going to expire in the next ten days
  const tenDayVaccines = await queryInjections(tenDayExpBegin, tenDayExpEnd);
  // All vaccinations that have been used so far from the bottles that are going to expire in the next ten days
  const tenDayVaccinations = await queryVaccinationsFromOrders(firstDate, reqTS, tenDayExpBegin, tenDayExpEnd)

  const data = {
    "expiresInTenDays": tenDayVaccines - tenDayVaccinations
  };
  return data;
}
module.exports = nextTenDays;
