
const load = require('../../loader')

const OrderClient = load({
  serviceName: 'OrderService',
  host: 'localhost:50051',
  fileName: 'order',
  packageName: 'order'
})

module.exports = OrderClient