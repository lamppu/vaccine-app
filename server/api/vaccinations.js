const queryVaccinationsWithKey = require('./utils').queryVaccinationsWithKey;
const queryVaccinationsWithOrderKey = require('./utils').queryVaccinationsWithOrderKey;
const queryVaccinations = require('./utils').queryVaccinations;
const queryProducersAndIds = require('./utils').queryProducersAndIds;

/*
This module returns the following data (on the requested day by the requested time):
- the total number of vaccinations
- vaccinations per producer
- vaccinations per healthcare district
- the gender distribution of the vaccinations
*/

const getVaccinationsList = async (iteratedList, vaccsNo, key, beginTS, endTS, queryFunction) => {
  const array = [];

  for (let index in iteratedList) {
    if (vaccsNo === 0) {
      array.push(0);
    } else {
      if (queryFunction === 'WithOrderKey') {
        array.push(await queryVaccinationsWithOrderKey(beginTS, endTS, key, iteratedList[index]));
      } else if (queryFunction === 'WithKey') {
        array.push(await queryVaccinationsWithKey(beginTS, endTS, key, iteratedList[index]));
      }

    }
  }
  return array;
}

// endTS is the datetime requested by the user and beginTS is the beginning (time is 00:00:00) of that requested day
const vaccinations = async (beginTS, endTS) => {

  const noOfVaccs = await queryVaccinations(beginTS, endTS);
  const districts = ["HYKS","KYS","OYS","TAYS","TYKS"];
  const genders = ['female', 'male', 'nonbinary'];
  const producersAndIds = await queryProducersAndIds();
  const producers = producersAndIds.map(item => item.producer);
  const ids = producersAndIds.map(item => item.id);

  const vaccinationsByDistrict = await getVaccinationsList(districts, noOfVaccs, 'healthCareDistrict', beginTS, endTS, 'WithOrderKey');
  const vaccinationsByGender = await getVaccinationsList(genders, noOfVaccs, 'gender', beginTS, endTS, 'WithKey');
  const vaccinationsByProducers = await getVaccinationsList(ids, noOfVaccs, 'vaccine', beginTS, endTS, 'WithOrderKey');

  let data = {
    "vaccinations": noOfVaccs,
    "districts": districts,
    "vaccinationsByDistrict": vaccinationsByDistrict,
    "genders": genders,
    "vaccinationsByGender": vaccinationsByGender,
    "producers": producers,
    "vaccinationsByProducers": vaccinationsByProducers
  };
  return data;
};

module.exports = vaccinations;
