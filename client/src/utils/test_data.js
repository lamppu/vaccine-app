const successDateTime = '2021-04-01T23:59:59Z';
const successData = {
  "success": true,
  "data": {
    "ordersData": {
      "orders": 41,
      "zerpfyOrders": 15,
      "antiquaOrders": 13,
      "solarBuddhicaOrders": 13,
      "hyksOrders": 17,
      "kysOrders": 4,
      "oysOrders": 4,
      "taysOrders": 9,
      "tyksOrders": 7,
      "vaccines": 205,
      "zerpfyVaccines": 75,
      "antiquaVaccines": 52,
      "solarBuddhicaVaccines": 78,
      "hyksVaccines": 89,
      "kysVaccines": 19,
      "oysVaccines": 19,
      "taysVaccines": 44,
      "tyksVaccines": 34
    },
    "vaccinationsData": {
      "vaccinations": 101,
      "zerpfyVaccinations": 35,
      "antiquaVaccinations": 31,
      "solarBuddhicaVaccinations": 35,
      "hyksVaccinations": 39,
      "kysVaccinations": 13,
      "oysVaccinations": 15,
      "taysVaccinations": 20,
      "tyksVaccinations": 14,
      "femaleVaccinations": 33,
      "maleVaccinations": 45,
      "nonbinaryVaccinations": 23
    },
    "vaccineData": {
      "usedArrived": 2,
      "leftToUse": 6379,
      "totalVaccinesInExpiredBottles": 216,
      "vaccinationsFromExpiredBottles": 63,
      "expiredBottles": 43,
      "expiredVaccines": 153,
      "vaccinesFromBeginning": 14807,
      "vaccinationsFromBeginning": 4123,
      "expiredVaccinesOverall": 10684,
      "expiresInTenDays": 1929
    }
  },
  "error": null
};

const invalidDateTime = 'k';
const invalidDateData = {
  "success": false,
  "data": null,
  "error": "Invalid Date"
}

const emptyDateData = {
  "success": false,
  "data": null,
  "error": "No date selected"
}

const zeroStats = {
  "usedArrived": 0,
  "leftToUse": 0,
  "totalVaccinesInExpiredBottles": 0,
  "vaccinationsFromExpiredBottles": 0,
  "expiredBottles": 0,
  "expiredVaccines": 0,
  "vaccinesFromBeginning": 0,
  "vaccinationsFromBeginning": 0,
  "expiredVaccinesOverall": 0,
  "expiresInTenDays": 0
}

module.exports.successDateTime = successDateTime;
module.exports.successData = successData;
module.exports.invalidDateTime = invalidDateTime;
module.exports.invalidDateData = invalidDateData;
module.exports.emptyDateData = emptyDateData;
module.exports.zeroStats = zeroStats;
