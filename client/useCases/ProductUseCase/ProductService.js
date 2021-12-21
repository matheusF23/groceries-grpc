const prompt = require("prompt-sync")()

const ProductClient = require('./ProductClient')

class ProductService {
  static selectProduct(products) {
    const productMap = {}
    products.forEach(product => productMap[product.id] = product.stock)
    const productsId = Object.keys(productMap)

    let idProduct = Number(prompt('Escolha um produto: '))
    while (!idProduct || !productsId.includes(idProduct + '')) {
      console.log('Produto inválido!')
      idProduct = Number(prompt('Escolha um produto: '))
    }

    let qty = Number(prompt('Qual a quantidade desejada?: '))
    while (!qty || qty > productMap[idProduct + ''] || qty < 1) {
      console.log('Quantidade inválida!')
      qty = Number(prompt('Qual a quantidade desejada?: '))
    }

    const product = products.find(product => product.id === idProduct)

    return { product, qty }
  }

  static async listAndSelectProducts() {
    console.log('\nEstes são todos os produtos disponíveis no momento:')
    const { products } = await ProductClient.list({})
    products.forEach(product => {
      console.log(`${product.id}: ${product.description}. Preço: ${product.price}. Estoque: ${product.stock}.`)
    })

    const choice = ProductService.selectProduct(products)

    return choice
  }

  static async listAndSelectProductsByCategory(category) {
    const { products } = await ProductClient.ListByCategory({ id: category })

    console.log(`\nEstes são todos os produtos disponíveis na categoria selecionada:`)
    products.forEach(product => {
      console.log(`${product.id}: ${product.description}. Preço: ${product.price}. Estoque: ${product.stock}.`)
    })

    const choice = ProductService.selectProduct(products)

    return choice
  }
}

module.exports = ProductService