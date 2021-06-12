const parser = require('../utils/parser.js');
const vaccination = require('../utils/vaccination.js');
const batchInsert = require('../utils/batch_insert.js');

const vaccPath = '../models/data/vaccinations.source';

const environment = process.env.NODE_ENV || 'development';

exports.seed = async (knex) => {
  try {
    // Getting an array of objects from the source file
    let vaccInsert = await parser(vaccPath, vaccination);
    // The maximum batch size for sqlite is 500, so the insert will be divided into several inserts
    if (environment == 'development') {
      await batchInsert(vaccInsert, knex, 'Vaccination', 500);
    } else {
      await knex('Vaccination').insert(vaccInsert);
    }
  } catch(e) {
    console.log(e);
  }
};
