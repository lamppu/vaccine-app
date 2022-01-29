const queryOrders = require('./utils').queryOrders;
const queryProducersAndIds = require('./utils').queryProducersAndIds;
const queryOrdersWithKey = require('./utils').queryOrdersWithKey;

/*
The function returns (on the requested day by the requested time):
- the total number of orders
- orders per producer
- orders per healthcare district
*/

// endTS is the datetime requested by the user and beginTS is the beginning (time is 00:00:00) of that requested day
const orders = async (beginTS, endTS) => {
  const noOfOrders = await queryOrders(beginTS, endTS);

  const districts = ["HYKS","KYS","OYS","TAYS","TYKS"];
  const producersAndIds = await queryProducersAndIds();
  const producers = producersAndIds.map(item => item.producer);

  let data = {
    "orders": noOfOrders,
    "districts": districts,
    "ordersByDistrict": [],
    "producers": producers,
    "ordersByProducer": []
  }
  const ordersByDistrict = [];

  for (let district in districts) {
    if (noOfOrders === 0) {
      ordersByDistrict.push(0);
    } else {
      ordersByDistrict.push(await queryOrdersWithKey(beginTS, endTS, 'healthCareDistrict', districts[district]));
    }
  }
  data.ordersByDistrict = ordersByDistrict;

  let vaccineIdMap = new Map();

  for (let item in producersAndIds) {
    vaccineIdMap.set(producersAndIds[item].producer, producersAndIds[item].id)
  }
  const ordersByProducer = [];

  for (let producer in producers) {
    if (noOfOrders === 0) {
      ordersByProducer.push(0);
    } else {
      ordersByProducer.push(await queryOrdersWithKey(beginTS, endTS, 'vaccine', vaccineIdMap.get(producers[producer])));
    }
  }
  data.ordersByProducer = ordersByProducer;

  return data;
}


module.exports = orders;
