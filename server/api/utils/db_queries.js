const Vaccination = require('../../models/bookshelf/vaccination.js');
const Order = require('../../models/bookshelf/order.js');

// Function for counting vaccinations that have been done between start and end dates from
// bottles that have arrived between subStart and subEnd
const queryVaccinations = async (start, end, subStart, subEnd) => {
  const subquery = await Order.whereBetween('arrived', subStart, subEnd).select('id').buildQuery();
  return await Vaccination.whereBetween('vaccinationDate', start, end).whereIn('sourceBottle', subquery.query).count();
}

// Function for counting vaccines from bottles that have arrived between start and end
const queryInjections = async (start, end) => {
  return (await Order.whereBetween('arrived', start, end).query().sum({injections: 'injections'}))[0].injections;
}

// Function for getting orders that have arrived between start and end
const queryOrders = async (start, end) => {
  return await Order.whereBetween('arrived', start, end).count();
}

module.exports.queryVaccinations = queryVaccinations;
module.exports.queryInjections = queryInjections;
module.exports.queryOrders = queryOrders;
