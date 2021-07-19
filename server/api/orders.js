const Order = require('../models/bookshelf/order.js');
const formatResponse = require('./utils/format_response.js');
const getBeginTimestamp = require('./utils/begin_stamp.js');

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

  const zerpfyOrders = await Order.whereBetween('arrived', beginTS, endTS).andWhere('vaccine', 'Zerpfy').count();
  const antiquaOrders = await Order.whereBetween('arrived', beginTS, endTS).andWhere('vaccine', 'Antiqua').count();
  const solarBuddhicaOrders = await Order.whereBetween('arrived', beginTS, endTS).andWhere('vaccine', 'SolarBuddhica').count();

  const hyksOrders = await Order.whereBetween('arrived', beginTS, endTS).andWhere('healthCareDistrict', 'HYKS').count();
  const kysOrders = await Order.whereBetween('arrived', beginTS, endTS).andWhere('healthCareDistrict', 'KYS').count();
  const oysOrders = await Order.whereBetween('arrived', beginTS, endTS).andWhere('healthCareDistrict', 'OYS').count();
  const taysOrders = await Order.whereBetween('arrived', beginTS, endTS).andWhere('healthCareDistrict', 'TAYS').count();
  const tyksOrders = await Order.whereBetween('arrived', beginTS, endTS).andWhere('healthCareDistrict', 'TYKS').count();

  const numVaccines = await Order.whereBetween('arrived', beginTS, endTS).query().sum({injections: 'injections'});

  const zerpfyVaccines = await Order.whereBetween('arrived', beginTS, endTS).andWhere('vaccine', 'Zerpfy').query().sum({injections: 'injections'});
  const antiquaVaccines = await Order.whereBetween('arrived', beginTS, endTS).andWhere('vaccine', 'Antiqua').query().sum({injections: 'injections'});
  const solarBuddhicaVaccines = await Order.whereBetween('arrived', beginTS, endTS).andWhere('vaccine', 'SolarBuddhica').query().sum({injections: 'injections'});

  const hyksVaccines = await Order.whereBetween('arrived', beginTS, endTS).andWhere('healthCareDistrict', 'HYKS').query().sum({injections: 'injections'});
  const kysVaccines = await Order.whereBetween('arrived', beginTS, endTS).andWhere('healthCareDistrict', 'KYS').query().sum({injections: 'injections'});
  const oysVaccines = await Order.whereBetween('arrived', beginTS, endTS).andWhere('healthCareDistrict', 'OYS').query().sum({injections: 'injections'});
  const taysVaccines = await Order.whereBetween('arrived', beginTS, endTS).andWhere('healthCareDistrict', 'TAYS').query().sum({injections: 'injections'});
  const tyksVaccines = await Order.whereBetween('arrived', beginTS, endTS).andWhere('healthCareDistrict', 'TYKS').query().sum({injections: 'injections'});

  let data = {
    "orders": numOrders,
    "zerpfyOrders": zerpfyOrders,
    "antiquaOrders": antiquaOrders,
    "solarBuddhicaOrders": solarBuddhicaOrders,
    "hyksOrders": hyksOrders,
    "kysOrders": kysOrders,
    "oysOrders": oysOrders,
    "taysOrders": taysOrders,
    "tyksOrders": tyksOrders,
    "vaccines": numVaccines[0].injections,
    "zerpfyVaccines": zerpfyVaccines[0].injections,
    "antiquaVaccines": antiquaVaccines[0].injections,
    "solarBuddhicaVaccines": solarBuddhicaVaccines[0].injections,
    "hyksVaccines": hyksVaccines[0].injections,
    "kysVaccines": kysVaccines[0].injections,
    "oysVaccines": oysVaccines[0].injections,
    "taysVaccines": taysVaccines[0].injections,
    "tyksVaccines": tyksVaccines[0].injections
  };
  return  formatResponse(true, data, null, null);
}

module.exports.ordersAndVaccines = ordersAndVaccines;
