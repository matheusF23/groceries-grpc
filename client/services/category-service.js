const prompt = require("prompt-sync")()

class CategoryService {
  constructor(categoryClient) {
    this.categoryClient = categoryClient
  }
  listCategories() {
    this.categoryClient.list({}, (err, categories) => {
      if (err) throw err
      console.log(categories)
    })
  }

  getCategory() {
    const { categories } = this.listCategories()
    
    console.log('\nQual categoria você deseja?')
    console.log('0: Todas')
    categories.forEach(category => {
      console.log(`${category.id}: ${category.description}`)
    })

    let response = Number(prompt('\nResponda: '))
    while (!response || response < 0 || response > categories.length) {
      console.log('Escolha um dos números indicados! ')
      response = Number(prompt('\nResponda: '))
    }

    return response
  }
}

module.exports = CategoryService