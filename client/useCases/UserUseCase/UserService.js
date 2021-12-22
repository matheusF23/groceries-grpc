const prompt = require("prompt-sync")()

const UserClient = require('./UserClient')

function getData(field) {
  let response = prompt(`Qual é o seu ${field}? `)
  while (!response) {
    console.log(`Opa, você esqueceu de digitar seu ${field}!`)
    response = prompt(`Qual é o seu ${field}? `)
  }

  return response
}

class UserService {
  static async addUser(userId) {
    let name = getData('nome')
    let cellphone = getData('telefone')
    let address = getData('endereço')

    try {
      await UserClient.add({ id: userId, name, cellphone, address })
    } catch (err) {
      console.log(`\n${err.details}`)
    }
  }
}

module.exports = UserService