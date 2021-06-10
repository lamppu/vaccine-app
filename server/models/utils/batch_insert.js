const batchInsert = async (arr, knex, table, maxBatch) => {
  try {
    let begin = 0;
    let end = (arr.length >= maxBatch) ? maxBatch : arr.length;
    let batchToRun;
    // Insert the array contents to the database table in batches of size maxBatch
    while (arr.length > 0) {
      batchToRun = arr.slice(begin,end);
      await knex(table).insert(batchToRun);
      arr = arr.slice(end);
      end = (arr.length >= maxBatch) ? maxBatch : arr.length;
    }
  } catch (e) {
    console.log(e);
  }
}

module.exports = batchInsert;
