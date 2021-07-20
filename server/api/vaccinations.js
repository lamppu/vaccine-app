const Vaccination = require('../models/bookshelf/vaccination.js');
const Order = require('../models/bookshelf/order.js');
const formatResponse = require('./utils/format_response.js');
const getBeginTimestamp = require('./utils/begin_stamp.js');

const getVaccinationCount = async (start, end, key, value) => {
  const subquery = await Order.where(key, value).select('id').buildQuery();
  return await Vaccination.whereBetween('vaccinationDate', start, end).whereIn('sourceBottle', subquery.query).count();
}
const getGenderCount = async (start, end, value) => {
  return await Vaccination.whereBetween('vaccinationDate', start, end).andWhere('gender', value).count();
}
// The total number of vaccinations on the given date, total & per producer & per district & gender distribution
const allVaccinations = async (dateString) => {
  if (!dateString) {
    return formatResponse(false, null, 400, "No date selected")
  }
  const endTS = new Date(dateString);

  if (endTS == 'Invalid Date') {
    return formatResponse(false, null, 400, "Invalid Date");
  }
  const beginTS = getBeginTimestamp(endTS);

  let data = {
    "vaccinations": await Vaccination.whereBetween('vaccinationDate', beginTS, endTS).count(),
    "zerpfyVaccinations": await getVaccinationCount(beginTS, endTS, 'vaccine', 'Zerpfy'),
    "antiquaVaccinations": await getVaccinationCount(beginTS, endTS, 'vaccine', 'Antiqua'),
    "solarBuddhicaVaccinations": await getVaccinationCount(beginTS, endTS, 'vaccine', 'SolarBuddhica'),
    "hyksVaccinations": await getVaccinationCount(beginTS, endTS, 'healthCareDistrict', 'HYKS'),
    "kysVaccinations": await getVaccinationCount(beginTS, endTS, 'healthCareDistrict', 'KYS'),
    "oysVaccinations": await getVaccinationCount(beginTS, endTS, 'healthCareDistrict', 'OYS'),
    "taysVaccinations": await getVaccinationCount(beginTS, endTS, 'healthCareDistrict', 'TAYS'),
    "tyksVaccinations": await getVaccinationCount(beginTS, endTS, 'healthCareDistrict', 'TYKS'),
    "femaleVaccinations": await getGenderCount(beginTS, endTS, 'female'),
    "maleVaccinations": await getGenderCount(beginTS, endTS, 'male'),
    "nonbinaryVaccinations": await getGenderCount(beginTS, endTS, 'nonbinary')
  };
  return formatResponse(true, data, null, null);
};

module.exports.allVaccinations = allVaccinations;
