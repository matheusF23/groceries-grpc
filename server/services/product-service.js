const { products } = require('../database/products')

module.exports = {
  List: (_, callback) => callback(null, { products })
}