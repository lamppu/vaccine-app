const bookshelf = require('../../config/bookshelf.js');

module.exports = bookshelf.model('Order', {
  tableName: 'Order',
  vaccine() {
    return this.belongsTo('Vaccine');
  }
})
