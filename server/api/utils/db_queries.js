const Vaccination = require('../../models/bookshelf/vaccination.js');
const Order = require('../../models/bookshelf/order.js');

// Function for getting vaccinations between dates start and end
const queryVaccinations = async (start, end) => {
  return await Vaccination.whereBetween('vaccinationDate', start, end).count();
}
// Function for getting vaccinations between dates start and end where key=value
const queryVaccinationsWithKey = async (start, end, key, value) => {
  return await Vaccination.whereBetween('vaccinationDate', start, end).andWhere(key, value).count();
}
// Function for getting vaccinations between dates start and end
// that have been taken from source bottles where key=value
const queryVaccinationsWithOrderKey = async (start, end, key, value) => {
  const subquery = await Order.where(key, value).select('id').buildQuery();
  return await Vaccination.whereBetween('vaccinationDate', start, end).whereIn('sourceBottle', subquery.query).count();
}
// Function for counting vaccinations that have been done between start and end dates
// from bottles that have arrived between subStart and subEnd
const queryVaccinationsFromOrders = async (start, end, subStart, subEnd) => {
  const subquery = await Order.whereBetween('arrived', subStart, subEnd).select('id').buildQuery();
  return await Vaccination.whereBetween('vaccinationDate', start, end).whereIn('sourceBottle', subquery.query).count();
}

// Function for counting vaccines from bottles that have arrived between start and end
const queryInjections = async (start, end) => {
  return (await Order.whereBetween('arrived', start, end).query().sum({injections: 'injections'}))[0].injections;
}
// Function for counting vaccines from bottles that have arrived between start and end
// and where key=value
const queryInjectionsWithKey = async (start, end, key, value) => {
  return (await Order.whereBetween('arrived', start, end).andWhere(key, value).query().sum({injections: 'injections'}))[0].injections;
}

// Function for getting orders that have arrived between start and end
const queryOrders = async (start, end) => {
  return await Order.whereBetween('arrived', start, end).count();
}
// Function for getting orders that have arrived between start and end where key=value
const queryOrdersWithKey = async (start, end, key, value) => {
  return await Order.whereBetween('arrived', start, end).andWhere(key, value).count();
}



module.exports.queryVaccinations = queryVaccinations;
module.exports.queryVaccinationsWithKey = queryVaccinationsWithKey;
module.exports.queryVaccinationsWithOrderKey = queryVaccinationsWithOrderKey;
module.exports.queryVaccinationsFromOrders = queryVaccinationsFromOrders;
module.exports.queryInjections = queryInjections;
module.exports.queryInjectionsWithKey = queryInjectionsWithKey;
module.exports.queryOrders = queryOrders;
module.exports.queryOrdersWithKey = queryOrdersWithKey;
