const mysql = require('./db.js');

module.exports = require('bookshelf')(mysql);
