const queryOrders = require('./utils').queryOrders;
const queryVaccineRows = require('./utils').queryVaccineRows;
const queryOrdersWithKey = require('./utils').queryOrdersWithKey;

/*
This module returns the following data (on the requested day by the requested time):
- the total number of arrived orders
- orders per producer
- orders per healthcare district
- the total number of arrived vaccines
*/

const getOrdersList = async (iteratedList, ordersNo, key, beginTS, endTS) => {
  const array = [];

  for (let index in iteratedList) {
    if (ordersNo === 0) {
      array.push(0);
    } else {
      array.push(await queryOrdersWithKey(beginTS, endTS, key, iteratedList[index]));

    }
  }
  return array;
}
// endTS is the datetime requested by the user and beginTS is the beginning (time is 00:00:00) of that requested day
const orders = async (beginTS, endTS) => {
  const noOfOrders = await queryOrders(beginTS, endTS);

  const districts = ["HYKS","KYS","OYS","TAYS","TYKS"];

  const vaccineRows = await queryVaccineRows();
  const producers = vaccineRows.map(item => item.producer);
  const ids = vaccineRows.map(item => item.id);
  const injections = vaccineRows.map(item => item.injections);

  const ordersByDistrict = await getOrdersList(districts, noOfOrders, 'healthCareDistrict', beginTS, endTS);
  const ordersByProducer = await getOrdersList(ids, noOfOrders, 'vaccine', beginTS, endTS);

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
