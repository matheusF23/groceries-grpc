const prompt = require("prompt-sync")()

const CategoryClient = require('./CategoryClient')

class CategoryService {
  static async getCategories() {
    const { categories } = await CategoryClient.list({})

    return categories
  }

  static async getUserCategory() {
    const categories = await CategoryService.getCategories()

    console.log('\nQual categoria você deseja?')
    console.log('0: Todas')
    categories.forEach(category => {
      console.log(`${category.id}: ${category.description}`)
    })

    let response = Number(prompt('Responda: '))
    while (!response || response < 0 || response > categories.length) {
      if (response === 0) break
      console.log('Escolha um dos números indicados! ')
      response = Number(prompt('Responda: '))
    }

    return response
  }
}

module.exports = CategoryService