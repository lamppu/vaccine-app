const Vaccination = require('../models/bookshelf/vaccination.js');
const Order = require('../models/bookshelf/order.js');

const getVaccinationCount = async (start, end, key, value) => {
  const subquery = await Order.where(key, value).select('id').buildQuery();
  return await Vaccination.whereBetween('vaccinationDate', start, end).whereIn('sourceBottle', subquery.query).count();
}
const getGenderCount = async (start, end, value) => {
  return await Vaccination.whereBetween('vaccinationDate', start, end).andWhere('gender', value).count();
}
// The total number of vaccinations on the given date, total & per producer & per district & gender distribution
const vaccinations = async (beginTS, endTS) => {

  const numVaccs = await Vaccination.whereBetween('vaccinationDate', beginTS, endTS).count();

  let data = {
    "vaccinations": numVaccs,
    "zerpfyVaccinations": (numVaccs === 0) ? 0 : await getVaccinationCount(beginTS, endTS, 'vaccine', 'Zerpfy'),
    "antiquaVaccinations": (numVaccs === 0) ? 0 : await getVaccinationCount(beginTS, endTS, 'vaccine', 'Antiqua'),
    "solarBuddhicaVaccinations": (numVaccs === 0) ? 0 : await getVaccinationCount(beginTS, endTS, 'vaccine', 'SolarBuddhica'),
    "hyksVaccinations": (numVaccs === 0) ? 0 : await getVaccinationCount(beginTS, endTS, 'healthCareDistrict', 'HYKS'),
    "kysVaccinations": (numVaccs === 0) ? 0 : await getVaccinationCount(beginTS, endTS, 'healthCareDistrict', 'KYS'),
    "oysVaccinations": (numVaccs === 0) ? 0 : await getVaccinationCount(beginTS, endTS, 'healthCareDistrict', 'OYS'),
    "taysVaccinations": (numVaccs === 0) ? 0 : await getVaccinationCount(beginTS, endTS, 'healthCareDistrict', 'TAYS'),
    "tyksVaccinations": (numVaccs === 0) ? 0 : await getVaccinationCount(beginTS, endTS, 'healthCareDistrict', 'TYKS'),
    "femaleVaccinations": (numVaccs === 0) ? 0 : await getGenderCount(beginTS, endTS, 'female'),
    "maleVaccinations": (numVaccs === 0) ? 0 : await getGenderCount(beginTS, endTS, 'male'),
    "nonbinaryVaccinations": (numVaccs === 0) ? 0 : await getGenderCount(beginTS, endTS, 'nonbinary')
  };
  return data;
};

module.exports = vaccinations;
