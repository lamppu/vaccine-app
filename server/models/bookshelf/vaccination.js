const bookshelf = require('../../config/bookshelf.js');
require('./order.js');

module.exports = bookshelf.model('Vaccination', {
  tableName: 'Vaccination',
  sourceBottle() {
    return this.belongsTo('Order');
  }
})
