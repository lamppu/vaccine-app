const dotenv = require('dotenv');
const path = require('path');

let envPath = './.env';
let sqlitePath = 'server/models/db.sqlite3';

let pathFromProjRoot = path.resolve();
pathFromProjRoot = pathFromProjRoot.split('vaccine-app')[1];

if (pathFromProjRoot == '\\server\\config') {
  envPath = '../../.env';
  sqlitePath = '../models/db.sqlite3';
}

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
    seeds: {
      directory: '../models/seeds'
    },
    debug: true
  }

};
