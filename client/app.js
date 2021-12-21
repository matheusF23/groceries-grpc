const CategoryService = require('./useCases/CategoryUseCase/CategoryService')
const UserService = require('./useCases/UserUseCase/UserService')
const ProductService = require('./useCases/ProductUseCase/ProductService')

async function main() {
  console.log('\nSeja bem vindo ao mercadinho SD!')
  const user = await UserService.addUser()
  const category = await CategoryService.getUserCategory()
  let product = {}

  if (category === 0) product = await ProductService.listProducts()
  else product = await ProductService.listProductsByCategory(category)
}

main()
