const Order = require('../models/bookshelf/order.js');
const formatResponse = require('./utils/format_response.js');
const getBeginTimestamp = require('./utils/begin_stamp.js');

const getOrderCount = async (start, end, key, value) => {
  return await Order.whereBetween('arrived', start, end).andWhere(key, value).count();
}
const getVaccineCount = async (start, end, key, value) => {
  return (await Order.whereBetween('arrived', start, end).andWhere(key, value).query().sum({injections: 'injections'}))[0].injections;
}

// The total number of orders and vaccines that have arrived on requested date, total & per producer & per district
const ordersAndVaccines = async (dateString) => {
  if (!dateString) {
    return formatResponse(false, null, 400, "No date selected")
  }
  const endTS = new Date(dateString);

  if (endTS == 'Invalid Date') {
    return formatResponse(false, null, 400, "Invalid Date");
  }
  const beginTS = getBeginTimestamp(endTS);

  let data = {
    "orders": await Order.whereBetween('arrived', beginTS, endTS).count(),
    "zerpfyOrders": await getOrderCount(beginTS, endTS, 'vaccine', 'Zerpfy'),
    "antiquaOrders": await getOrderCount(beginTS, endTS, 'vaccine', 'Antiqua'),
    "solarBuddhicaOrders": await getOrderCount(beginTS, endTS, 'vaccine', 'SolarBuddhica'),
    "hyksOrders": await getOrderCount(beginTS, endTS, 'healthCareDistrict', 'HYKS'),
    "kysOrders": await getOrderCount(beginTS, endTS, 'healthCareDistrict', 'KYS'),
    "oysOrders": await getOrderCount(beginTS, endTS, 'healthCareDistrict', 'OYS'),
    "taysOrders": await getOrderCount(beginTS, endTS, 'healthCareDistrict', 'TAYS'),
    "tyksOrders": await getOrderCount(beginTS, endTS, 'healthCareDistrict', 'TYKS'),
    "vaccines": (await Order.whereBetween('arrived', beginTS, endTS).query().sum({injections: 'injections'}))[0].injections,
    "zerpfyVaccines": (await getVaccineCount(beginTS, endTS, 'vaccine', 'Zerpfy')),
    "antiquaVaccines": (await getVaccineCount(beginTS, endTS, 'vaccine', 'Antiqua')),
    "solarBuddhicaVaccines": (await getVaccineCount(beginTS, endTS, 'vaccine', 'SolarBuddhica')),
    "hyksVaccines": (await getVaccineCount(beginTS, endTS, 'healthCareDistrict', 'HYKS')),
    "kysVaccines": (await getVaccineCount(beginTS, endTS, 'healthCareDistrict', 'KYS')),
    "oysVaccines": (await getVaccineCount(beginTS, endTS, 'healthCareDistrict', 'OYS')),
    "taysVaccines": (await getVaccineCount(beginTS, endTS, 'healthCareDistrict', 'TAYS')),
    "tyksVaccines": (await getVaccineCount(beginTS, endTS, 'healthCareDistrict', 'TYKS'))
  };
  return  formatResponse(true, data, null, null);
}

module.exports.ordersAndVaccines = ordersAndVaccines;
