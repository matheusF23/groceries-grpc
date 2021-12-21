const CategoryService = require('./useCases/CategoryUseCase/CategoryService')
const UserService = require('./useCases/UserUseCase/UserService')
// const UserService = require('./services/user-service')
// const ProductService = require('./services/product-service')

async function main() {
  console.log('\nSeja bem vindo ao mercadinho SD!')
    const user = await UserService.addUser()

    const category = await CategoryService.getUserCategory()
//     if ( category === 0) {
//       this.productService
//     }
}


//   init() {
//     console.log('\nSeja bem vindo ao mercadinho SD!')
//     const user = this.userService.addUser()
//     const category = this.categoryService.getCategory()

//     if ( category === 0) {
//       this.productService
//     }
//   }

// }

main()