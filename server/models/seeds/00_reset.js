
exports.seed = async (knex) => {
  // Deleting existing entries
  await knex('Vaccination').del();
  await knex('Order').del();
};
