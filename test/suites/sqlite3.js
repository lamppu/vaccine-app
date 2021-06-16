const expect = require('chai').expect;
const knex = require('knex');
const config = require('../../server/config/knexfile.js')['development'];
const sqlite3 = (knex)(config);
const bookshelf = require('bookshelf')(sqlite3);

const Order = bookshelf.model('Order', {
  tableName: 'Order'
});

const Vaccination = bookshelf.model('Vaccination', {
  tableName: 'Vaccination',
  sourceBottle() {
    return this.belongsTo('Order');
  }
})

const getTables = async () => {
  return await sqlite3('sqlite_master')
  .select('name')
  .where('type', 'table')
  .andWhereNot('name', 'knex_migrations')
  .andWhereNot('name', 'knex_migrations_lock')
  .andWhereNot('name', 'like', 'sqlite_%');
}

describe('Testing sqlite3 database', function() {
  it('database should have two tables', async () => {
    expect(await getTables()).to.have.lengthOf(2);
  });

  it('database should have tables "Order" and "Vaccination"', async () => {
    expect(await getTables()).deep.to.equal([
      {name: 'Order'},
      {name: 'Vaccination'}
    ]);
  });

  it('table "Order" in database should have 5000 rows', async () => {
    expect(await Order.count()).to.equal(5000);
  });

  it('table "Vaccination" in database should have 7000 rows', async () => {
    expect(await Vaccination.count()).to.equal(7000);
  });
});
