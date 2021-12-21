const path = require('path')
const grpc = require('@grpc/grpc-js')
const protoLoader = require('@grpc/proto-loader')
const { promisify } = require('util')

const { PROTO_CONFIG } = require('../utils/proto-config')

module.exports = function load({
  serviceName,
  fileName,
  packageName,
  host,
  credentials = grpc.credentials.createInsecure(),
}) {
  const protoDef = protoLoader.loadSync(
    path.resolve(__dirname, '..', `proto/${fileName}.proto`),
    PROTO_CONFIG
  )

  const proto = grpc.loadPackageDefinition(protoDef)[packageName]

  const client = new proto[serviceName](host, credentials)

  // Promisify all client methods
  Object.entries(client.__proto__).map(([prop, value]) => {
    if (value.originalName !== undefined) {
      client[prop] = promisify(value)
    }
  })

  return client
}