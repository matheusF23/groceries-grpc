const grpc = require('@grpc/grpc-js')

const { products } = require('../database/products')

function listByCategory(call, callback) {
  const category = call.request
  const productsByCategory = products.filter(product => product.category.id === category.id)

  if (productsByCategory.length === 0) return callback({
    code: grpc.status.NOT_FOUND,
    message: "Produtos não encontrados"
  })

  callback(null, { products: productsByCategory})
}

module.exports = {
  list: (_, callback) => callback(null, { products }),
  listByCategory
}