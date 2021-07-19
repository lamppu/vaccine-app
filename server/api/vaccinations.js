const Vaccination = require('../models/bookshelf/vaccination.js');
const Order = require('../models/bookshelf/order.js');
const formatResponse = require('./utils/format_response.js');
const getBeginTimestamp = require('./utils/begin_stamp.js');

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

  const vaccinations = await Vaccination.whereBetween('vaccinationDate', beginTS, endTS).count();

  const zerpfySubquery = await Order.where('vaccine', 'Zerpfy').select('id').buildQuery();
  const zerpfyVaccs = await Vaccination.whereBetween('vaccinationDate', beginTS, endTS).whereIn('sourceBottle', zerpfySubquery.query).count();

  const antiquaSubquery = await Order.where('vaccine', 'Antiqua').select('id').buildQuery();
  const antiquaVaccs = await Vaccination.whereBetween('vaccinationDate', beginTS, endTS).whereIn('sourceBottle', antiquaSubquery.query).count();

  const solarBudSubquery = await Order.where('vaccine', 'SolarBuddhica').select('id').buildQuery();
  const solarBudVaccs = await Vaccination.whereBetween('vaccinationDate', beginTS, endTS).whereIn('sourceBottle', solarBudSubquery.query).count();

  let data = {
    "vaccinations": vaccinations,
    "zerpfyVaccinations": zerpfyVaccs,
    "antiquaVaccinations": antiquaVaccs,
    "solarBuddhicaVaccinations": solarBudVaccs
  }

  return formatResponse(true, data, null, null);
};

module.exports.allVaccinations = allVaccinations;
