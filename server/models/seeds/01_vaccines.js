const fs = require('fs');
const firstline = require('firstline');
const orderPath = 'server/models/data/orders/';

exports.seed = async (knex) => {
  try {
    let orderFiles = fs.readdirSync(orderPath);
    
    for (let file in orderFiles) {
      let first = await firstline(orderPath + orderFiles[file]);
      let obj = JSON.parse(first);
      let insert = [{producer: obj.vaccine, injections: obj.injections}];
      await knex('Vaccine').insert(insert);
    }

  } catch(e) {
    console.log(e);
  }
}
