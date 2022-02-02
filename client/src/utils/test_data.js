const successDateTime = '2021-04-01T23:59:59.999999Z';
const successData = {
  successOrdersData : {
      "success": true,
      "data": {
          "orders": 9,
          "districts": [
              "HYKS",
              "KYS",
              "OYS",
              "TAYS",
              "TYKS"
          ],
          "ordersByDistrict": [
              1,
              2,
              2,
              1,
              3
          ],
          "producers": [
              "Antiqua",
              "SolarBuddhica",
              "Zerpfy"
          ],
          "ordersByProducer": [
              3,
              4,
              2
          ],
          "vaccines": 46
      },
      "error": null
  },

  successVaccinationsData : {
      "success": true,
      "data": {
          "vaccinations": 11,
          "districts": [
              "HYKS",
              "KYS",
              "OYS",
              "TAYS",
              "TYKS"
          ],
          "vaccinationsByDistrict": [
              5,
              0,
              4,
              1,
              1
          ],
          "genders": [
              "female",
              "male",
              "nonbinary"
          ],
          "vaccinationsByGender": [
              1,
              6,
              4
          ],
          "producers": [
              "Antiqua",
              "SolarBuddhica",
              "Zerpfy"
          ],
          "vaccinationsByProducer": [
              3,
              7,
              1
          ],
          "vaccinationsFromArrived": 6
      },
      "error": null
  },

  successExpirationsData : {
      "success": true,
      "data": {
          "totalVaccinesInExpiredBottles": 30,
          "vaccinationsFromExpiredBottles": 7,
          "expiredBottles": 6,
          "expiredVaccines": 23
      },
      "error": null
  },

  successOverallData : {
      "success": true,
      "data": {
          "vaccinesFromBeginning": 2583,
          "vaccinationsFromBeginning": 746,
          "expiredVaccinesOverall": 1837
      },
      "error": null
  },

  successTenDaysData : {
      "success": true,
      "data": {
          "expiresInTenDays": 1993
      },
      "error": null
  },

  successLeftToUseData : {
      "success": true,
      "data": {
          "leftToUse": 6428
      },
      "error": null
  }
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

const zeroData = {
  zeroOrdersData : {
      "success": true,
      "data": {
          "orders": 0,
          "districts": [
              "HYKS",
              "KYS",
              "OYS",
              "TAYS",
              "TYKS"
          ],
          "ordersByDistrict": [
              0,
              0,
              0,
              0,
              0
          ],
          "producers": [
              "Antiqua",
              "SolarBuddhica",
              "Zerpfy"
          ],
          "ordersByProducer": [
              0,
              0,
              0
          ],
          "vaccines": 0
      },
      "error": null
  },

  zeroVaccinationsData : {
      "success": true,
      "data": {
          "vaccinations": 0,
          "districts": [
              "HYKS",
              "KYS",
              "OYS",
              "TAYS",
              "TYKS"
          ],
          "vaccinationsByDistrict": [
              0,
              0,
              0,
              0,
              0
          ],
          "genders": [
              "female",
              "male",
              "nonbinary"
          ],
          "vaccinationsByGender": [
              0,
              0,
              0
          ],
          "producers": [
              "Antiqua",
              "SolarBuddhica",
              "Zerpfy"
          ],
          "vaccinationsByProducer": [
              0,
              0,
              0
          ],
          "vaccinationsFromArrived": 0
      },
      "error": null
  },

  zeroExpirationsData : {
      "success": true,
      "data": {
          "totalVaccinesInExpiredBottles": 0,
          "vaccinationsFromExpiredBottles": 0,
          "expiredBottles": 0,
          "expiredVaccines": 0
      },
      "error": null
  },

  zeroOverallData : {
      "success": true,
      "data": {
          "vaccinesFromBeginning": 0,
          "vaccinationsFromBeginning": 0,
          "expiredVaccinesOverall": 0
      },
      "error": null
  },

  zeroTenDaysData : {
      "success": true,
      "data": {
          "expiresInTenDays": 0
      },
      "error": null
  },

  zeroLeftToUseData : {
      "success": true,
      "data": {
          "leftToUse": 0
      },
      "error": null
  }
};

module.exports.successDateTime = successDateTime;
module.exports.successData = successData;
module.exports.invalidDateTime = invalidDateTime;
module.exports.invalidDateData = invalidDateData;
module.exports.emptyDateData = emptyDateData;
module.exports.zeroData = zeroData;
