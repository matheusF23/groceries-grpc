const grpc = require('@grpc/grpc-js')
const protoLoader = require('@grpc/proto-loader')
const path = require('path')

const ProductService = require('./services/product-service')

const PRODUCT_PROTO_PATH = path.resolve(__dirname, '../proto/product.proto')
const PROTO_CONFIG = {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true
}

const productPackageDefinition = protoLoader.loadSync(PRODUCT_PROTO_PATH, PROTO_CONFIG)

const productPackage = grpc.loadPackageDefinition(productPackageDefinition).product
const productServiceProto = productPackage.ProductService

const server = new grpc.Server()

server.addService(productServiceProto.service, ProductService)

server.bindAsync('127.0.0.1:50051', grpc.ServerCredentials.createInsecure(), (error, port) => {
  console.log(`Server running - Port: ${port}`);
  server.start()
})
