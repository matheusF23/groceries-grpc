const { products } = require('../database/products')

module.exports = {
  List: (_, callback) => callback(null, { products }),
  ListByCategory: (call, callback) => {
    const category = call.request
    const productsByCategory = products.filter(product => product.category.id === category.id)

    callback(null, { products: productsByCategory})
  }
}