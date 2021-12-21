
const load = require('../loader')

const CategoryClient = load({
  serviceName: 'CategoryService',
  host: 'localhost:50051',
  fileName: 'category',
  packageName: 'category'
})

module.exports = CategoryClient