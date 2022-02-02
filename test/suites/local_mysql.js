const expect = require('chai').expect;
const knex = require('knex');
const config = require('../../knexfile.js')['test'];
const mysql = (knex)(config);
const bookshelf = require('bookshelf')(mysql);

const Vaccine = bookshelf.model('Vaccine', {
  tableName: 'Vaccine'
});

const Order = bookshelf.model('Order', {
  tableName: 'Order',
  vaccine() {
    return this.belongsTo('Vaccine');
  }
});

const Vaccination = bookshelf.model('Vaccination', {
  tableName: 'Vaccination',
  sourceBottle() {
    return this.belongsTo('Order');
  }
});

const getTables = async () => {
  return await mysql('information_schema.TABLES')
  .select('table_name')
  .where('table_schema', process.env.L_MYSQL_DB)
  .andWhereNot('table_name', 'knex_migrations')
  .andWhereNot('table_name', 'knex_migrations_lock');
}

describe('Testing local mysql database', function() {
  it('database should have three tables', async () => {
    expect(await getTables()).to.have.lengthOf(3);
  });

  it('database should have tables "Order", "Vaccination" and "Vaccine"', async () => {
    const tables = await getTables();

    const first = tables[0].TABLE_NAME || tables[0].table_name;
    const second = tables[1].TABLE_NAME || tables[1].table_name;
    const third = tables[2].TABLE_NAME || tables[2].table_name;

    expect(first.toLowerCase()).to.equal('order');
    expect(second.toLowerCase()).to.equal('vaccination');
    expect(third.toLowerCase()).to.equal('vaccine');
  });

  it('table "Order" in database should have 5000 rows', async () => {
    expect(await Order.count()).to.equal(5000);
  });

  it('table "Vaccination" in database should have 7000 rows', async () => {
    expect(await Vaccination.count()).to.equal(7000);
  });

  it('table "Vaccine" in database should have three rows', async () => {
    expect(await Vaccine.count()).to.equal(3);
  });
});
