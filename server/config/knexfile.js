const dotenv = require('dotenv');

dotenv.config({path: '../../.env'});

module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: '../models/db.sqlite3'
    },
    migrations: {
      directory: '../models/migrations'
    },
    debug: true
  },

  production: {
    client: 'mysql',
    connection: {
      host: process.env.MYSQL_HOST,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PWD,
      database: process.env.MYSQL_DB,
    },
    migrations: {
      directory: '../models/migrations'
    },
    debug: true
  }

};
