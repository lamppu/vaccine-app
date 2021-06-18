const Order = require('../models/bookshelf/order.js');
const formatResponse = require('./utils/format_response.js');
const getBeginTimestamp = require('./utils/begin_stamp.js');

const allOrders = async (dateString) => {
  if (!dateString) {
    return formatResponse(false, null, 400, "No date selected")
  }
  const endTS = new Date(dateString);

  if (endTS == 'Invalid Date') {
    return formatResponse(false, null, 400, "Invalid Date");
  }
  const beginTS = getBeginTimestamp(endTS);

  const numOrders = await Order.whereBetween('arrived', beginTS, endTS).count();
  const numVaccines = await Order.whereBetween('arrived', beginTS, endTS).query().sum({injections: 'injections'});

  return  formatResponse(true, {"orders": numOrders, "vaccines": numVaccines[0].injections}, null, null);
}

module.exports.allOrders = allOrders;
