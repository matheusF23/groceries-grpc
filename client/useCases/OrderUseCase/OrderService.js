const { v4: uuidv4 } = require('uuid');

const OrderClient = require('./OrderClient')

class OrderService {
  static async addProduct(product, qty, userId) {
    const id = uuidv4()
    const payload = { id, userId, productId: product.id, qty}
    await OrderClient.addProduct(payload)
  }
}

module.exports = OrderService