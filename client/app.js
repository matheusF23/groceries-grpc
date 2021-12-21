const CategoryService = require('./CategoryUserCase/CategoryService')
// const UserService = require('./services/user-service')
// const ProductService = require('./services/product-service')

async function main() {
  console.log('\nSeja bem vindo ao mercadinho SD!')
//     const user = this.userService.addUser()
    const category = await CategoryService.getUserCategory()
    console.log(category)
//     if ( category === 0) {
//       this.productService
//     }
}

// class App {
//   constructor(clients) {
//     this.userService = new UserService(clients.userClient)
//     this.categoryService = new CategoryService(clients.categoryClient)
//     this.productService = new ProductService(clients.productService)
//   }

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