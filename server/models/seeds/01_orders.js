const parser = require('../utils/parser.js');
const order = require('../utils/order.js');
const batchInsert = require('../utils/batch_insert.js');
const getPath = require('../../utils/get_path.js');

const antiquaPath = getPath('\\server\\config', '../models/data/Antiqua.source', 'server/models/data/Antiqua.source');
const solBuddPath = getPath('\\server\\config', '../models/data/SolarBuddhica.source','server/models/data/SolarBuddhica.source');
const zerpfyPath = getPath('\\server\\config', '../models/data/Zerpfy.source', 'server/models/data/Zerpfy.source');

const environment = process.env.NODE_ENV || 'development';

exports.seed = async (knex) => {
  try {
    // Getting arrays of objects from the source files
    let antiquaInsert = await parser(antiquaPath, order);
    let solBuddInsert = await parser(solBuddPath, order);
    let zerpfyInsert = await parser(zerpfyPath, order);
    // The maximum batch size for sqlite is 500, so the insert will be divided into several inserts
    if (environment == 'development') {
      await batchInsert(antiquaInsert, knex, 'Order', 500);
      await batchInsert(solBuddInsert, knex, 'Order', 500);
      await batchInsert(zerpfyInsert, knex, 'Order', 500);
    } else {
      await knex('Order').insert(antiquaInsert);
      await knex('Order').insert(solBuddInsert);
      await knex('Order').insert(zerpfyInsert);
    }

  } catch(e) {
    console.log(e);
  }
};
