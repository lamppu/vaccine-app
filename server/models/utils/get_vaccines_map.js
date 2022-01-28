const Vaccine = require('../../models/bookshelf/vaccine.js');

const getVaccinesMap = async () => {
  let vaccines = (await Vaccine.select(['id', 'producer']).get()).toJSON();
  let map = new Map();

  for (let vaccine in vaccines) {
    map.set(vaccines[vaccine].producer, vaccines[vaccine].id)
  }

  return map;
}

module.exports = getVaccinesMap;
