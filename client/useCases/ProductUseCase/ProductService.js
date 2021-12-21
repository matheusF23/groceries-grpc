const prompt = require("prompt-sync")()

const ProductClient = require('./ProductClient')

class ProductService {
  static selectProduct(products) {
    const productIds = products.map(product => product.id)

    let response = Number(prompt('Escolha um produto: '))
    while (!response || !productIds.includes(response)) {
      console.log('Produto inválido!')
      response = Number(prompt('Escolha um produto: '))
    }

    return products.find(product => product.id === response)
  }

  static async listProducts() {
    console.log('\nEstes são todos os produtos disponíveis no momento:')
    const { products } = await ProductClient.list({})
    products.forEach(product => {
      console.log(`${product.id}: ${product.description}. Preço: ${product.price}. Estoque: ${product.stock}.`)
    })

    const product = ProductService.selectProduct(products)

    return product
  }

  static async listProductsByCategory(category) {
    const { products } = await ProductClient.ListByCategory({ id: category })

    console.log(`\nEstes são todos os produtos disponíveis na categoria selecionada:`)
    products.forEach(product => {
      console.log(`${product.id}: ${product.description}. Preço: ${product.price}. Estoque: ${product.stock}.`)
    })

    const product = ProductService.selectProduct(products)

    return product
  }
}

module.exports = ProductService