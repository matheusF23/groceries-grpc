const grpc = require('@grpc/grpc-js')
const protoLoader = require('@grpc/proto-loader')

const { PROTO_CONFIG } = require('./utils/proto-config')
const protoPaths = require('./utils/proto-paths')

const ProductService = require('./services/product-service')
const CategoryService = require('./services/category-service')
const OrderService = require('./services/order-service')

const productPackageDefinition = protoLoader.loadSync(protoPaths.PRODUCT_PROTO_PATH, PROTO_CONFIG)
const categoryPackageDefinition = protoLoader.loadSync(protoPaths.CATEGORY_PROTO_PATH, PROTO_CONFIG)
const orderPackageDefinition = protoLoader.loadSync(protoPaths.ORDER_PROTO_PATH, PROTO_CONFIG)

const productPackage = grpc.loadPackageDefinition(productPackageDefinition).product
const categoryPackage = grpc.loadPackageDefinition(categoryPackageDefinition).category
const orderPackage = grpc.loadPackageDefinition(orderPackageDefinition).order

const productServiceProto = productPackage.ProductService
const categoryServiceProto = categoryPackage.CategoryService
const orderServiceProto = orderPackage.OrderService

const server = new grpc.Server()

server.addService(productServiceProto.service, ProductService)
server.addService(categoryServiceProto.service, CategoryService)
server.addService(orderServiceProto.service, OrderService)

server.bindAsync('127.0.0.1:50051', grpc.ServerCredentials.createInsecure(), (error, port) => {
  console.log(`Server running - Port: ${port}`);
  server.start()
})
