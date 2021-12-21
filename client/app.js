const CategoryService = require('./useCases/CategoryUseCase/CategoryService')
const UserService = require('./useCases/UserUseCase/UserService')
const ProductService = require('./useCases/ProductUseCase/ProductService')
const OrderService = require('./useCases/OrderUseCase/OrderService')

async function main() {
  console.log('\nSeja bem vindo ao mercadinho SD!')
  const user = await UserService.addUser()
  const category = await CategoryService.getUserCategory()

  let choice = {}
  if (category === 0) choice  = await ProductService.listAndSelectProducts()
  else choice = await ProductService.listAndSelectProductsByCategory(category)

  const { product, qty } = choice

  await OrderService.addProduct(product, qty, user)
}

main()
