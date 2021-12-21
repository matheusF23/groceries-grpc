
const load = require('../../loader')

const UserClient = load({
  serviceName: 'UserService',
  host: 'localhost:50051',
  fileName: 'user',
  packageName: 'user'
})

module.exports = UserClient