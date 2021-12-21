const prompt = require("prompt-sync")()

const OrderClient = require('./OrderClient')

class OrderService {
  static async addProduct(product, qty, userId, orderId) {
    const payload = { id: orderId, userId, productId: product.id, qty }
    await OrderClient.addProduct(payload)
  }

  static async listOrder(orderId) {
    try{
      const order = await OrderClient.list({ id: orderId })
      console.log('Aqui está o seu pedido:\n')
      order.products.forEach(product => console.log(`${product.qty} ${product.product.description}`))
      console.log(`Valor Total: R$ ${order.totalPrice}\n`)
    } catch (err) {
      console.log(`\n${err.details}`)
    }
  }
}

module.exports = OrderService