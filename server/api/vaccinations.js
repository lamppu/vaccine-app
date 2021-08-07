const queryVaccinationsWithKey = require('./utils').queryVaccinationsWithKey;
const queryVaccinationsWithOrderKey = require('./utils').queryVaccinationsWithOrderKey;
const queryVaccinations = require('./utils').queryVaccinations;

/*
The function returns (on the requested day by the requested time):
- the total number of vaccinations
- vaccinations per producer
- vaccinations per healthcare district
- the gender distribution of the vaccinations
*/

// endTS is the datetime requested by the user and beginTS is the beginning (time is 00:00:00) of that requested day
const vaccinations = async (beginTS, endTS) => {

  const numVaccs = await queryVaccinations(beginTS, endTS);

  let data = {
    "vaccinations": numVaccs,
    "zerpfyVaccinations": (numVaccs === 0) ? 0 : await queryVaccinationsWithOrderKey(beginTS, endTS, 'vaccine', 'Zerpfy'),
    "antiquaVaccinations": (numVaccs === 0) ? 0 : await queryVaccinationsWithOrderKey(beginTS, endTS, 'vaccine', 'Antiqua'),
    "solarBuddhicaVaccinations": (numVaccs === 0) ? 0 : await queryVaccinationsWithOrderKey(beginTS, endTS, 'vaccine', 'SolarBuddhica'),
    "hyksVaccinations": (numVaccs === 0) ? 0 : await queryVaccinationsWithOrderKey(beginTS, endTS, 'healthCareDistrict', 'HYKS'),
    "kysVaccinations": (numVaccs === 0) ? 0 : await queryVaccinationsWithOrderKey(beginTS, endTS, 'healthCareDistrict', 'KYS'),
    "oysVaccinations": (numVaccs === 0) ? 0 : await queryVaccinationsWithOrderKey(beginTS, endTS, 'healthCareDistrict', 'OYS'),
    "taysVaccinations": (numVaccs === 0) ? 0 : await queryVaccinationsWithOrderKey(beginTS, endTS, 'healthCareDistrict', 'TAYS'),
    "tyksVaccinations": (numVaccs === 0) ? 0 : await queryVaccinationsWithOrderKey(beginTS, endTS, 'healthCareDistrict', 'TYKS'),
    "femaleVaccinations": (numVaccs === 0) ? 0 : await queryVaccinationsWithKey(beginTS, endTS, 'gender', 'female'),
    "maleVaccinations": (numVaccs === 0) ? 0 : await queryVaccinationsWithKey(beginTS, endTS, 'gender', 'male'),
    "nonbinaryVaccinations": (numVaccs === 0) ? 0 : await queryVaccinationsWithKey(beginTS, endTS, 'gender', 'nonbinary')
  };
  return data;
};

module.exports = vaccinations;
