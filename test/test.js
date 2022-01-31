require('./suites/model_utils.js');

require('./suites/sqlite3.js');
if (process.env.L_MYSQL_DB) {
  require('./suites/local_mysql.js');
}
require('./suites/api_utils.js');
require('./suites/db_queries.js');
require('./suites/apis.js');
