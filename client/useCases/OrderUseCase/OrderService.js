const prompt = require("prompt-sync")()

const OrderClient = require('./OrderClient')

class OrderService {
  static async addProduct(product, qty, userId, orderId) {
    const payload = { id: orderId, userId, productId: product.id, qty }
    try {
      await OrderClient.addProduct(payload)
    } catch (err) {
      console.log(`\n${err.details}`)
    }
  }

  static async removeProduct(order, userId) {

    console.log('\nQual produto você gostaria de remover?')
    for (let i = 0; i < order.products.length; i++) {
      console.log(`${i}: ${order.products[i].product.description}`)
    }

    let productToBeRemoved = prompt('> ')
    let product = order.products[Number(productToBeRemoved)] || null
    while (!productToBeRemoved || Number(productToBeRemoved) < 0 || !product) {
      console.log('Escolha uma produto da lista!')
      productToBeRemoved = prompt('> ')
      product = order.products[Number(productToBeRemoved)] || null
    }

    console.log()

    console.log('Qual a quantidade?')
    let qty = Number(prompt('> '))
    while (!qty || qty > product.qty) {
      console.log('Quantidade inválida!')
      console.log('Qual a quantidade?')
      qty = Number(prompt('> '))
    }

    try {
      await OrderClient.removeProduct({
        id: order.id,
        productId: product.product.id,
        userId,
        qty
      })
    } catch (err) {
      console.log(`\n${err.details}`)
    }
  }

  static async listAndGetOrder(orderId, userId) {
    try {
      const order = await OrderClient.list({ id: orderId })
      console.log('------------------------------------')
      console.log('### Aqui está o seu pedido ###\n')
      order.products.forEach(product => console.log(`${product.qty} ${product.product.description}`))
      console.log(`Valor Total: R$ ${order.totalPrice}`)
      console.log('------------------------------------')

      return order
    } catch (err) {
      if (err.details === 'No connection established') throw { error: 'Sem conexção com o servidor!' }
      console.log(`\n${err.details}`)
    }
  }
}

module.exports = OrderService