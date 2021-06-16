require('./suites/model_utils.js');

require('./suites/sqlite3.js');
if (process.env.L_MYSQL_DB) {
  require('./suites/local_mysql.js');
}
