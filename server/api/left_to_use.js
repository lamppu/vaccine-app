const addDays = require('./utils').addDays;
const addMicrosecond = require('./utils').addMicrosecond;
const queryVaccinationsFromOrders = require('./utils').queryVaccinationsFromOrders;
const queryInjections = require('./utils').queryInjections;

/*
This module returns:
- how many vaccines are left to use
*/

const leftToUse = async (reqTS) => {
  const monthAgoTS = addDays(reqTS, -30);

  // Orders arrived since notExpiredBeginTS have not expired yet
  let notExpiredBeginTS = addMicrosecond(monthAgoTS);

  // All vaccines that have arrived between notExpiredBeginTS and reqTS
  const vaccinesFromNotExpired = await queryInjections(notExpiredBeginTS, reqTS);
  // All vaccinations that have been given from the bottles that have arrived between notExpiredBeginTS and reqTS
  const vaccinationsFromNotExpired = await queryVaccinationsFromOrders(notExpiredBeginTS, reqTS, notExpiredBeginTS, reqTS);

  const data = {
    "leftToUse": vaccinesFromNotExpired - vaccinationsFromNotExpired
  };
  return data;
}
module.exports = leftToUse;
