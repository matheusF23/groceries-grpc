const prompt = require("prompt-sync")()

const ProductClient = require('./ProductClient')

class ProductService {
  static selectProduct(products) {
    const productMap = {}
    products.forEach(product => productMap[product.id] = product.stock)
    const productsId = Object.keys(productMap)

    console.log('Escolha um produto:')
    let idProduct = Number(prompt('> '))
    while (!idProduct || !productsId.includes(idProduct + '')) {
      console.log('Produto inválido!')
      console.log('Escolha um produto:')
      idProduct = Number(prompt('> '))
    }

    console.log('Qual a quantidade desejada?')
    let qty = Number(prompt('> '))
    while (!qty || qty > productMap[idProduct + ''] || qty < 1) {
      console.log('Quantidade inválida!')
      console.log('Qual a quantidade desejada?')
      qty = Number(prompt('> '))
    }

    const product = products.find(product => product.id === idProduct)

    return { product, qty }
  }

  static async listAndSelectProducts() {
    try {
      console.log('\nEstes são todos os produtos disponíveis no momento:')
      const { products } = await ProductClient.list({})
      products.forEach(product => {
        console.log(`${product.id}: ${product.description}. Preço: R$ ${product.price}. Estoque: ${product.stock}.`)
      })

      const choice = ProductService.selectProduct(products)

      return choice
    } catch (err) {
      console.log(`\n${err.details}`)
    }
  }

  static async listAndSelectProductsByCategory(category) {
    try {
      const { products } = await ProductClient.ListByCategory({ id: category })

      console.log(`\nEstes são todos os produtos disponíveis na categoria selecionada:`)
      products.forEach(product => {
        console.log(`${product.id}: ${product.description}. Preço: R$ ${product.price}. Estoque: ${product.stock}.`)
      })

      const choice = ProductService.selectProduct(products)

      return choice
    } catch (err) {
      console.log(`\n${err.details}`)
    }
  }
}

module.exports = ProductService