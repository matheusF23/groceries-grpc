const { orders } = require('../database/orders')
const { products } = require('../database/products')
const { users } = require('../database/users')

function list(call, callback) {
  const order = orders.find(order => order.id === call.request.id)

  if (!order) return callback({
    code: 5,
    message: "Pedido não encontrado"
  })

  callback(null, order)
}

function addProduct(call, callback) {
  const { id, productId, userId, qty } = call.request

  const user = users.find(user => user.id === userId)
  let product = products.find(product => product.id === productId)

  if (!user) return callback({
    code: 5,
    message: "Usuário não encontrado"
  })

  if (!product) return callback({
    code: 5,
    message: "Produto não encontrado"
  })

  const price = product.price * qty
  product.stock -= qty
  product = { qty, product }

  let order = { id, totalPrice: price, user, products: [product] }
  const orderIndex = orders.findIndex(order => order.id === id)

  if (orderIndex === -1) {
    orders.push(order)
  } else {
    if(orders[orderIndex].user.id !== user.id) return callback({
      code: 3,
      message: "O pedido informado pertence a outro usuário"
    })

    const productIndex = orders[orderIndex].products.findIndex(product => product.product.id === productId)
    if (productIndex === -1) {
      orders[orderIndex].products.push(product)
    } else {
      orders[orderIndex].products[productIndex].qty += qty
    }
    orders[orderIndex].totalPrice += price
  }

  callback(null, {})
}

function removeProduct(call, callback) {
  const { id, productId, userId, qty } = call.request

  const user = users.find(user => user.id === userId)
  let product = products.find(product => product.id === productId)

  if (!user) return callback({
    code: 5,
    message: "Usuário não encontrado"
  })

  if (!product) return callback({
    code: 5,
    message: "Produto não encontrado"
  })

  const price = product.price * qty
  const orderIndex = orders.findIndex(order => order.id === id)

  if (orderIndex === -1) {
    return callback({
      code: 5,
      message: "Pedido não encontrado"
    })
  } else {
    if(orders[orderIndex].user.id !== user.id) return callback({
      code: 3,
      message: "O pedido informado pertence a outro usuário"
    })

    const productIndex = orders[orderIndex].products.findIndex(product => product.product.id === productId)
    if (productIndex === -1) {
      return callback({
        code: 5,
        message: "Produto não encontrado no pedido"
      })
    } else {
      if (qty > orders[orderIndex].products[productIndex].qty) {
        return callback({
          code: 3,
          message: "Quantidade inválida"
        })
      }
      orders[orderIndex].products[productIndex].qty -= qty
      if(orders[orderIndex].products[productIndex].qty === 0) {
        orders[orderIndex].products.splice(productIndex, 1)
      }
      orders[orderIndex].totalPrice -= price
      product.stock += qty
    }
  }

  callback(null, {})
}

module.exports = {
  list,
  addProduct,
  removeProduct
}