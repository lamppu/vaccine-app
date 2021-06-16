const dotenv = require('dotenv');
const getPath = require('../utils/get_path.js');

let envPath = getPath('\\server\\config', '../../.env', './.env');
let sqlitePath = getPath('\\server\\config', '../models/db.sqlite3', 'server/models/db.sqlite3');
let migrationsPath = getPath('\\server\\config', '../models/migrations', 'server/models/migrations');
let seedsPath = getPath('\\server\\config', '../models/seeds', 'server/models/seeds');

dotenv.config({path: envPath});

module.exports = {
  test: {
    client: 'mysql',
    connection: {
      host: process.env.L_MYSQL_HOST,
      user: process.env.L_MYSQL_USER,
      password: process.env.L_MYSQL_PWD,
      database: process.env.L_MYSQL_DB,
    },
    migrations: {
      directory: migrationsPath
    },
    seeds: {
      directory: seedsPath
    },
    debug: false
  },
  development: {
    client: 'sqlite3',
    connection: {
      filename: sqlitePath
    },
    migrations: {
      directory: migrationsPath
    },
    seeds: {
      directory: seedsPath
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
      directory: migrationsPath
    },
    seeds: {
      directory: seedsPath
    },
    debug: false
  }

};
