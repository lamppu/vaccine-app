
exports.up = async (knex) => await knex.schema
  .createTable('Order', (table) => {
    table.uuid('id').primary();
    table.integer('orderNumber');
    table.string('responsiblePerson');
    table.string('healthCareDistrict');
    table.string('vaccine');
    table.integer('injections');
    table.specificType('arrived', 'DATETIME(6)');
    table.index('arrived', 'idx_arrived');
  })
  .createTable('Vaccination', (table) => {
    table.uuid('vaccinationId').primary();
    table.uuid('sourceBottle');
    table.string('gender');
    table.specificType('vaccinationDate', 'DATETIME(6)');
    table.foreign('sourceBottle').references('Order.id');
    table.index('vaccinationDate', 'idx_vaccinationDate');
  });

exports.down = async (knex) => await knex.schema
  .dropTableIfExists('Vaccination')
  .dropTableIfExists('Order');
