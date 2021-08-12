const db = require('./db.js');
const bookshelf = require('bookshelf')(db);
bookshelf.plugin(require('bookshelf-eloquent'));
module.exports = bookshelf;
