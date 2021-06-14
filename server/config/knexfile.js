const dotenv = require('dotenv');
const getPath = require('../utils/get_path.js');

let envPath = getPath('\\server\\config', '../../.env', './.env');
let sqlitePath = getPath('\\server\\config', '../models/db.sqlite3', 'server/models/db.sqlite3');

dotenv.config({path: envPath});

module.exports = {

  development: {

    client: 'sqlite3',
    connection: {
      filename: sqlitePath
    },
    migrations: {
      directory: '../models/migrations'
    },
    seeds: {
      directory: '../models/seeds'
    },
    debug: false
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
    seeds: {
      directory: '../models/seeds'
    },
    debug: false
  }

};
