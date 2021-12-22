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

    console.log('Gostaria de adicionar mais um produto?\n1: Sim\n2: Não')
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
  console.log('\nSeja bem vindo ao mercadinho SD!')
  const userId = uuidv4()
  const orderId = uuidv4()
  await UserService.addUser(userId)

  let finish = false

  while (!finish) {
    await addProducts(userId, orderId)
    await OrderService.listOrder(orderId, userId)
    finish = true
  }
}

main()
