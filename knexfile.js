const dotenv = require('dotenv');

dotenv.config({path: './.env'});

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
      directory: 'server/models/migrations'
    },
    seeds: {
      directory: 'server/models/seeds'
    },
    debug: false
  },
  development: {
    client: 'sqlite3',
    connection: {
      filename: 'server/models/db.sqlite3'
    },
    migrations: {
      directory: 'server/models/migrations'
    },
    seeds: {
      directory: 'server/models/seeds'
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
      directory: 'server/models/migrations'
    },
    seeds: {
      directory: 'server/models/seeds'
    },
    debug: false
  }

};
