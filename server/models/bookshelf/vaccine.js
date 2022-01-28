const bookshelf = require('../../config/bookshelf.js');

module.exports = bookshelf.model('Vaccine', {
  tableName: 'Vaccine'
})
