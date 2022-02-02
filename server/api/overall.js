const addDays = require('./utils').addDays;
const compareDateStrings = require('./utils').compareDateStrings;
const queryVaccinationsFromOrders = require('./utils').queryVaccinationsFromOrders;
const queryInjections = require('./utils').queryInjections;

/*
This module returns:
- the amount of vaccines that have arrived 30 days or more ago
- the amount of vaccinations that have been given from the vaccines that have arrived 30 days or more ago
- the total amount of vaccines that have expired before usage by requested datetime (since January 2nd)
*/

const overall = async (reqTS) => {
  // The first date with data
  const firstDate = '2021-01-02 00:00:00.000000';

  // The vaccines expire 30 days after arrival
  // A date 30 days before the requested date
  const monthAgoTS = addDays(reqTS, -30);

  // All vaccines that have arrived between firstDate and monthAgoTS, checking first that monthAgoTS is later than firstDate
  const compared = compareDateStrings(monthAgoTS, firstDate);
  const vaccinesFromBeginning = (compared === -1 || compared === 0) ? 0 : await queryInjections(firstDate, monthAgoTS);

  // All vaccinations that have been given between firstDate and the requested reqTS
  // from the bottles that have arrived between firstDate and monthAgoTS
  const vaccinationsFromBeginning = (vaccinesFromBeginning === 0) ? 0 : await queryVaccinationsFromOrders(firstDate, reqTS, firstDate, monthAgoTS);


  const data = {
    "vaccinesFromBeginning": vaccinesFromBeginning,
    "vaccinationsFromBeginning": vaccinationsFromBeginning,
    "expiredVaccinesOverall": (vaccinesFromBeginning-vaccinationsFromBeginning),
  };
  return data;
}
module.exports = overall;
