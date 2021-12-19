const { categories } = require('../database/categories')

module.exports = {
  List: (_, callback) => callback(null, { categories })
}