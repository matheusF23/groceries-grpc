
const load = require('../../loader')

const ProductClient = load({
  serviceName: 'ProductService',
  host: 'localhost:50051',
  fileName: 'product',
  packageName: 'product'
})

module.exports = ProductClient