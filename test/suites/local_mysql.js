const expect = require('chai').expect;
const knex = require('knex');
const config = require('../../knexfile.js')['test'];
const mysql = (knex)(config);
const bookshelf = require('bookshelf')(mysql);

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
  return await mysql('information_schema.TABLES')
  .select('table_name')
  .where('table_schema', process.env.L_MYSQL_DB)
  .andWhereNot('table_name', 'knex_migrations')
  .andWhereNot('table_name', 'knex_migrations_lock');
}

describe('Testing local mysql database', function() {
  it('database should have two tables', async () => {
    expect(await getTables()).to.have.lengthOf(2);
  });

  it('database should have tables "Order" and "Vaccination"', async () => {
    const tables = await getTables();

    const first = tables[0].TABLE_NAME || tables[0].table_name;
    const second = tables[1].TABLE_NAME || tables[1].table_name;

    expect(first.toLowerCase()).to.equal('order');
    expect(second.toLowerCase()).to.equal('vaccination');
  });

  it('table "Order" in database should have 5000 rows', async () => {
    expect(await Order.count()).to.equal(5000);
  });

  it('table "Vaccination" in database should have 7000 rows', async () => {
    expect(await Vaccination.count()).to.equal(7000);
  });
});
