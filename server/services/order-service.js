const grpc = require('@grpc/grpc-js')

const { orders } = require('../database/orders')

function list (call, callback) {
  const order = orders.find(order => order.id === call.request.id)

  if (!order) return callback({
    code: grpc.status.NOT_FOUND,
    message: "Pedido não encontrado"
  })

  callback(null, order)
}

module.exports = {
  list
}