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
  const numOrders = await Order.whereBetween('arrived', beginTS, endTS).count();
  let data = {
    "orders": numOrders,
    "zerpfyOrders": (numOrders === 0) ? 0 : await getOrderCount(beginTS, endTS, 'vaccine', 'Zerpfy'),
    "antiquaOrders": (numOrders === 0) ? 0 : await getOrderCount(beginTS, endTS, 'vaccine', 'Antiqua'),
    "solarBuddhicaOrders": (numOrders === 0) ? 0 : await getOrderCount(beginTS, endTS, 'vaccine', 'SolarBuddhica'),
    "hyksOrders": (numOrders === 0) ? 0 : await getOrderCount(beginTS, endTS, 'healthCareDistrict', 'HYKS'),
    "kysOrders": (numOrders === 0) ? 0 : await getOrderCount(beginTS, endTS, 'healthCareDistrict', 'KYS'),
    "oysOrders": (numOrders === 0) ? 0 : await getOrderCount(beginTS, endTS, 'healthCareDistrict', 'OYS'),
    "taysOrders": (numOrders === 0) ? 0 : await getOrderCount(beginTS, endTS, 'healthCareDistrict', 'TAYS'),
    "tyksOrders": (numOrders === 0) ? 0 : await getOrderCount(beginTS, endTS, 'healthCareDistrict', 'TYKS'),
    "vaccines": (numOrders === 0) ? 0 : (await Order.whereBetween('arrived', beginTS, endTS).query().sum({injections: 'injections'}))[0].injections,
    "zerpfyVaccines": (numOrders === 0) ? 0 : (await getVaccineCount(beginTS, endTS, 'vaccine', 'Zerpfy')),
    "antiquaVaccines": (numOrders === 0) ? 0 : (await getVaccineCount(beginTS, endTS, 'vaccine', 'Antiqua')),
    "solarBuddhicaVaccines": (numOrders === 0) ? 0 : (await getVaccineCount(beginTS, endTS, 'vaccine', 'SolarBuddhica')),
    "hyksVaccines": (numOrders === 0) ? 0 : (await getVaccineCount(beginTS, endTS, 'healthCareDistrict', 'HYKS')),
    "kysVaccines": (numOrders === 0) ? 0 : (await getVaccineCount(beginTS, endTS, 'healthCareDistrict', 'KYS')),
    "oysVaccines": (numOrders === 0) ? 0 : (await getVaccineCount(beginTS, endTS, 'healthCareDistrict', 'OYS')),
    "taysVaccines": (numOrders === 0) ? 0 : (await getVaccineCount(beginTS, endTS, 'healthCareDistrict', 'TAYS')),
    "tyksVaccines": (numOrders === 0) ? 0 : (await getVaccineCount(beginTS, endTS, 'healthCareDistrict', 'TYKS'))
  };
  return formatResponse(true, data, null, null);
}

module.exports.ordersAndVaccines = ordersAndVaccines;
