const prompt = require("prompt-sync")()
const { v4: uuidv4 } = require('uuid');

function getData(field) {
  let response = prompt(`\nQual é o seu ${field}? `)
  while (!response) {
    console.log(`Opa, você esqueceu de digitar seu ${field}!`)
    response = prompt(`Qual é o seu ${field}? `)
  }

  return response
}

class UserService {
  constructor(userClient) {
    this.userClient = userClient
  }

  addUser() {
    const id = uuidv4()
    let name = getData('name')
    let cellphone = getData('cellphone')
    let address = getData('address')

    this.userClient.add({ id, name, cellphone, address }, (err, result) => {
      if (err) throw err
    })

    return id
  }
}

module.exports = UserService