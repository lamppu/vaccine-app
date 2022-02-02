const parser = require('../utils/parser.js');
const order = require('../utils/order.js');
const batchInsert = require('../utils/batch_insert.js');
const fs = require('fs');
const getVaccinesMap = require('../utils/get_vaccines_map.js')

const orderPath = 'server/models/data/orders/';

exports.seed = async (knex) => {
  try {
    // Files containing orders
    let orderFiles = fs.readdirSync(orderPath);
    // Map of producer names and their corresponding database table id's
    let vaccinesMap = await getVaccinesMap();

    for (let file in orderFiles) {
      let path = orderPath + orderFiles[file];
      let producer = (orderFiles[file].split('.'))[0];
      let id = vaccinesMap.get(producer);
      // Getting arrays of objects from the source files
      let insert = await parser(path, order, id);
      // The maximum batch size for sqlite is 500, so the insert will be divided into several inserts
      if (knex.client.config.client == 'sqlite3') {
        await batchInsert(insert, knex, 'Order', 500);
      } else {
        await knex('Order').insert(insert);
      }
    }

  } catch(e) {
    console.log(e);
  }
};
