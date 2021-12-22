const { v4: uuidv4 } = require('uuid');
const prompt = require("prompt-sync")()

const CategoryService = require('./useCases/CategoryUseCase/CategoryService')
const UserService = require('./useCases/UserUseCase/UserService')
const ProductService = require('./useCases/ProductUseCase/ProductService')
const OrderService = require('./useCases/OrderUseCase/OrderService')

async function addProducts(userId, orderId) {
  while (true) {
    const category = await CategoryService.getUserCategory()

    let choice = {}
    if (category === 0) choice = await ProductService.listAndSelectProducts()
    else choice = await ProductService.listAndSelectProductsByCategory(category)

    const { product, qty } = choice

    await OrderService.addProduct(product, qty, userId, orderId)

    console.log('\nGostaria de adicionar mais um produto?\n1: Sim\n2: Não')
    let oneMoreProduct = Number(prompt(''))
    while (!oneMoreProduct, ![1, 2].includes(oneMoreProduct)) {
      console.log('Opção inválida')
      console.log('Gostaria de adicionar mais um produto?\n1: Sim\n2: Não')
      oneMoreProduct = Number(prompt(''))
    }

    if (oneMoreProduct === 2) break
  }
}

async function main() {
  console.log('------------------------------------')
  console.log('# Seja bem vindo ao mercadinho SD! #')
  console.log('------------------------------------')

  const userId = uuidv4()
  const orderId = uuidv4()
  await UserService.addUser(userId)

  let addProduct = true

  while (true) {
    if (addProduct) await addProducts(userId, orderId)

    while (true) {
      const order = await OrderService.listAndGetOrder(orderId, userId)
      if (order.products.length > 0) {
        console.log('Gostaria de remover algum produto?\n1: Sim\n2: Não')
        const removeProduct = Number(prompt(''))
        while (!removeProduct || ![1, 2].includes(removeProduct)) {
          console.log('Opção inválida')
          console.log('Gostaria de remover algum produto?\n1: Sim\n2: Não')
          removeProduct = Number(prompt(''))
        }

        if (removeProduct === 1) OrderService.removeProduct(order, userId)
        else break
      } else break
    }

    console.log('\nGostaria de finalizar o pedido?\n1: Sim\n2: Não')
    let finishOrder = Number(prompt(''))
    while (!finishOrder, ![1, 2].includes(finishOrder)) {
      console.log('Opção inválida')
      console.log('\nGostaria de finalizar o pedido?\n1: Sim\n2: Não')
      finishOrder = Number(prompt(''))
    }

    if (finishOrder === 1) {
      console.log('------------------------------------')
      console.log('# Pedido finalizado com sucesso!\nVolte Sempre! #')
      console.log('------------------------------------')
      break
    }

    console.log('Gostaria de adicionar mais um produto?\n1: Sim\n2: Não')
    let addOneMoreProduct = Number(prompt(''))
    while (!addOneMoreProduct, ![1, 2].includes(addOneMoreProduct)) {
      console.log('Opção inválida')
      console.log('Gostaria de adicionar mais um produto?\n1: Sim\n2: Não')
      addOneMoreProduct = Number(prompt(''))
    }

    if (addOneMoreProduct === 2) addProducts = false
  }
}

main()
