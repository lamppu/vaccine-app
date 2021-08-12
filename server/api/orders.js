const queryOrders = require('./utils').queryOrders;
const queryInjections = require('./utils').queryInjections;
const queryInjectionsWithKey = require('./utils').queryInjectionsWithKey;
const queryOrdersWithKey = require('./utils').queryOrdersWithKey;

/*
The function returns (on the requested day by the requested time):
- the total number of orders
- orders per producer
- orders per healthcare district
- the total number of vaccines
- vaccines per producer
- vaccines per healthcare district
*/

// endTS is the datetime requested by the user and beginTS is the beginning (time is 00:00:00) of that requested day
const ordersAndVaccines = async (beginTS, endTS) => {
  const numOrders = await queryOrders(beginTS, endTS);

  let data = {
    "orders": numOrders,
    "zerpfyOrders": (numOrders === 0) ? 0 : await queryOrdersWithKey(beginTS, endTS, 'vaccine', 'Zerpfy'),
    "antiquaOrders": (numOrders === 0) ? 0 : await queryOrdersWithKey(beginTS, endTS, 'vaccine', 'Antiqua'),
    "solarBuddhicaOrders": (numOrders === 0) ? 0 : await queryOrdersWithKey(beginTS, endTS, 'vaccine', 'SolarBuddhica'),
    "hyksOrders": (numOrders === 0) ? 0 : await queryOrdersWithKey(beginTS, endTS, 'healthCareDistrict', 'HYKS'),
    "kysOrders": (numOrders === 0) ? 0 : await queryOrdersWithKey(beginTS, endTS, 'healthCareDistrict', 'KYS'),
    "oysOrders": (numOrders === 0) ? 0 : await queryOrdersWithKey(beginTS, endTS, 'healthCareDistrict', 'OYS'),
    "taysOrders": (numOrders === 0) ? 0 : await queryOrdersWithKey(beginTS, endTS, 'healthCareDistrict', 'TAYS'),
    "tyksOrders": (numOrders === 0) ? 0 : await queryOrdersWithKey(beginTS, endTS, 'healthCareDistrict', 'TYKS'),
    "vaccines": (numOrders === 0) ? 0 : await queryInjections(beginTS, endTS),
    "zerpfyVaccines": (numOrders === 0) ? 0 : await queryInjectionsWithKey(beginTS, endTS, 'vaccine', 'Zerpfy'),
    "antiquaVaccines": (numOrders === 0) ? 0 : await queryInjectionsWithKey(beginTS, endTS, 'vaccine', 'Antiqua'),
    "solarBuddhicaVaccines": (numOrders === 0) ? 0 : await queryInjectionsWithKey(beginTS, endTS, 'vaccine', 'SolarBuddhica'),
    "hyksVaccines": (numOrders === 0) ? 0 : await queryInjectionsWithKey(beginTS, endTS, 'healthCareDistrict', 'HYKS'),
    "kysVaccines": (numOrders === 0) ? 0 : await queryInjectionsWithKey(beginTS, endTS, 'healthCareDistrict', 'KYS'),
    "oysVaccines": (numOrders === 0) ? 0 : await queryInjectionsWithKey(beginTS, endTS, 'healthCareDistrict', 'OYS'),
    "taysVaccines": (numOrders === 0) ? 0 : await queryInjectionsWithKey(beginTS, endTS, 'healthCareDistrict', 'TAYS'),
    "tyksVaccines": (numOrders === 0) ? 0 : await queryInjectionsWithKey(beginTS, endTS, 'healthCareDistrict', 'TYKS')
  };

  return data;
}

module.exports = ordersAndVaccines;
