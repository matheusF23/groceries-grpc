const { products } = require('../database/products')

function listByCategory(call, callback) {
  const category = call.request
  const productsByCategory = products.filter(product => product.category.id === category.id)

  if (productsByCategory.length === 0) return callback({
    code: 5,
    message: "Produtos não encontrados"
  })

  callback(null, { products: productsByCategory})
}

module.exports = {
  list: (_, callback) => callback(null, { products }),
  listByCategory
}