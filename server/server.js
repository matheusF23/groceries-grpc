const grpc = require('@grpc/grpc-js')
const protoLoader = require('@grpc/proto-loader')

const { PROTO_CONFIG } = require('./utils/proto-config')
const protoPaths = require('./utils/proto-paths')

const { ProductService, CategoryService, OrderService, UserService } = require('./services')

const productPackageDefinition = protoLoader.loadSync(protoPaths.PRODUCT_PROTO_PATH, PROTO_CONFIG)
const categoryPackageDefinition = protoLoader.loadSync(protoPaths.CATEGORY_PROTO_PATH, PROTO_CONFIG)
const orderPackageDefinition = protoLoader.loadSync(protoPaths.ORDER_PROTO_PATH, PROTO_CONFIG)
const userPackageDefinition = protoLoader.loadSync(protoPaths.USER_PROTO_PATH, PROTO_CONFIG)

const productPackage = grpc.loadPackageDefinition(productPackageDefinition).product
const categoryPackage = grpc.loadPackageDefinition(categoryPackageDefinition).category
const orderPackage = grpc.loadPackageDefinition(orderPackageDefinition).order
const userPackage = grpc.loadPackageDefinition(userPackageDefinition).user

const productServiceProto = productPackage.ProductService
const categoryServiceProto = categoryPackage.CategoryService
const orderServiceProto = orderPackage.OrderService
const userServiceProto = userPackage.UserService

const server = new grpc.Server()

server.addService(productServiceProto.service, ProductService)
server.addService(categoryServiceProto.service, CategoryService)
server.addService(orderServiceProto.service, OrderService)
server.addService(userServiceProto.service, UserService)

server.bindAsync('127.0.0.1:50051', grpc.ServerCredentials.createInsecure(), (error, port) => {
  console.log(`Server running - Port: ${port}`);
  server.start()
})
