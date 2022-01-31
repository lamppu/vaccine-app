const Vaccination = require('../../models/bookshelf/vaccination.js');
const Order = require('../../models/bookshelf/order.js');
const Vaccine = require('../../models/bookshelf/vaccine.js');

// Function for getting id for producer
const queryIdForProducer = async (producer) => {
  return ((await Vaccine.select('id').where('producer', producer).first()).toJSON()).id;
}
// Function for getting id's and names of producers from Vaccine table
const queryProducersAndIds = async () => {
  return (await Vaccine.select(['id', 'producer']).get()).toJSON();
}
// Function for getting id's, names of producers, and number of injections per bottle from Vaccine table
const queryVaccineRows = async () => {
  return (await Vaccine.get()).toJSON();
}

// Function for getting number of vaccinations between dates start and end
const queryVaccinations = async (start, end) => {
  return await Vaccination.whereBetween('vaccinationDate', start, end).count();
}
// Function for getting number of vaccinations between dates start and end where key=value
const queryVaccinationsWithKey = async (start, end, key, value) => {
  return await Vaccination.whereBetween('vaccinationDate', start, end).andWhere(key, value).count();
}
// Function for getting number of vaccinations between dates start and end
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
  const vaccines = await queryVaccineRows();
  let map = new Map();

  for (let item in vaccines) {
    map.set(vaccines[item].id, vaccines[item].injections)
  }

  let count = 0;
  for (let [id, injections] of map) {
    const orders = await Order.whereBetween('arrived', start, end).andWhere('vaccine', id).count();
    count += injections * orders;
  }

  return count;
}

// Function for getting number of orders that have arrived between start and end
const queryOrders = async (start, end) => {
  return await Order.whereBetween('arrived', start, end).count();
}
// Function for getting number of orders that have arrived between start and end where key=value
const queryOrdersWithKey = async (start, end, key, value) => {
  return await Order.whereBetween('arrived', start, end).andWhere(key, value).count();
}

module.exports.queryIdForProducer = queryIdForProducer;
module.exports.queryProducersAndIds = queryProducersAndIds;
module.exports.queryVaccineRows = queryVaccineRows;
module.exports.queryVaccinations = queryVaccinations;
module.exports.queryVaccinationsWithKey = queryVaccinationsWithKey;
module.exports.queryVaccinationsWithOrderKey = queryVaccinationsWithOrderKey;
module.exports.queryVaccinationsFromOrders = queryVaccinationsFromOrders;
module.exports.queryInjections = queryInjections;
module.exports.queryOrders = queryOrders;
module.exports.queryOrdersWithKey = queryOrdersWithKey;
