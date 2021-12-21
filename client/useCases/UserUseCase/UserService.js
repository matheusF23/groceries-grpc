const prompt = require("prompt-sync")()
const { v4: uuidv4 } = require('uuid');

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
  static async addUser() {
    const id = uuidv4()
    let name = getData('nome')
    let cellphone = getData('telefone')
    let address = getData('endereço')

    await UserClient.add({id, name, cellphone, address})
    
    return id
  }
}

module.exports = UserService