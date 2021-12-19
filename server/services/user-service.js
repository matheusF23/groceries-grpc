const { users } = require('../database/users')

function add(call, callback) {
  const userData = call.request

  let user = users.find(user => user.id === userData.id)

  if (!user) users.push(userData)

  callback(null, {})
}

module.exports = {
  add
}