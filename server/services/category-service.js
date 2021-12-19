const { categories } = require('../database/categories')

module.exports = {
  list: (_, callback) => callback(null, { categories })
}