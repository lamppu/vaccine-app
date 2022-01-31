const queryVaccinationsWithKey = require('./utils').queryVaccinationsWithKey;
const queryVaccinationsWithOrderKey = require('./utils').queryVaccinationsWithOrderKey;
const queryVaccinationsFromOrders = require('./utils').queryVaccinationsFromOrders;
const queryVaccinations = require('./utils').queryVaccinations;
const queryProducersAndIds = require('./utils').queryProducersAndIds;

/*
This module returns the following data (on the requested day by the requested time):
- the total number of vaccinations
- vaccinations per producer
- vaccinations per healthcare district
- the gender distribution of the vaccinations
- the number of vaccinations that have been given from bottles that have arrived on the requested day by the requested time
*/

const getVaccinationsList = async (iteratedList, vaccsNo, key, beginTS, reqTS, queryFunction) => {
  const array = [];

  for (let index in iteratedList) {
    if (vaccsNo === 0) {
      array.push(0);
    } else {
      if (queryFunction === 'WithOrderKey') {
        array.push(await queryVaccinationsWithOrderKey(beginTS, reqTS, key, iteratedList[index]));
      } else if (queryFunction === 'WithKey') {
        array.push(await queryVaccinationsWithKey(beginTS, reqTS, key, iteratedList[index]));
      }

    }
  }
  return array;
}

const vaccinations = async (reqTS) => {
  const beginTS = reqTS.substring(0, 10) + ' 00:00:00.000000';

  const noOfVaccs = await queryVaccinations(beginTS, reqTS);

  const districts = ['HYKS','KYS','OYS','TAYS','TYKS'];
  const genders = ['female', 'male', 'nonbinary'];
  const producersAndIds = await queryProducersAndIds();
  const producers = producersAndIds.map(item => item.producer);
  const ids = producersAndIds.map(item => item.id);

  const vaccinationsByDistrict = await getVaccinationsList(districts, noOfVaccs, 'healthCareDistrict', beginTS, reqTS, 'WithOrderKey');
  const vaccinationsByGender = await getVaccinationsList(genders, noOfVaccs, 'gender', beginTS, reqTS, 'WithKey');
  const vaccinationsByProducer = await getVaccinationsList(ids, noOfVaccs, 'vaccine', beginTS, reqTS, 'WithOrderKey');

  let data = {
    "vaccinations": noOfVaccs,
    "districts": districts,
    "vaccinationsByDistrict": vaccinationsByDistrict,
    "genders": genders,
    "vaccinationsByGender": vaccinationsByGender,
    "producers": producers,
    "vaccinationsByProducer": vaccinationsByProducer,
    "vaccinationsFromArrived": (noOfVaccs === 0) ? 0 : await queryVaccinationsFromOrders(beginTS, reqTS, beginTS, reqTS)
  };
  return data;
};

module.exports = vaccinations;
