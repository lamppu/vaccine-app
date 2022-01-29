const queryOrders = require('./utils').queryOrders;
const queryVaccineRows = require('./utils').queryVaccineRows;
const queryOrdersWithKey = require('./utils').queryOrdersWithKey;

/*
The function returns (on the requested day by the requested time):
- the total number of arrived orders
- orders per producer
- orders per healthcare district
- the total number of arrived vaccines
*/

// endTS is the datetime requested by the user and beginTS is the beginning (time is 00:00:00) of that requested day
const orders = async (beginTS, endTS) => {
  const noOfOrders = await queryOrders(beginTS, endTS);

  const districts = ["HYKS","KYS","OYS","TAYS","TYKS"];

  const vaccineRows = await queryVaccineRows();
  const producers = vaccineRows.map(item => item.producer);
  const ids = vaccineRows.map(item => item.id);
  const injections = vaccineRows.map(item => item.injections);

  const ordersByDistrict = [];

  for (let index in districts) {
    if (noOfOrders === 0) {
      ordersByDistrict.push(0);
    } else {
      ordersByDistrict.push(await queryOrdersWithKey(beginTS, endTS, 'healthCareDistrict', districts[index]));
    }
  }

  const ordersByProducer = [];

  for (let index in ids) {
    if (noOfOrders === 0) {
      ordersByProducer.push(0);
    } else {
      ordersByProducer.push(await queryOrdersWithKey(beginTS, endTS, 'vaccine', ids[index]));
    }
  }

  let noOfVaccines = 0;

  if (noOfOrders !== 0) {
    for (let index in injections) {
      noOfVaccines += ordersByProducer[index] * injections[index];
    }
  }

  let data = {
    "orders": noOfOrders,
    "districts": districts,
    "ordersByDistrict": ordersByDistrict,
    "producers": producers,
    "ordersByProducer": ordersByProducer,
    "vaccines": noOfVaccines
  }

  return data;
}


module.exports = orders;
