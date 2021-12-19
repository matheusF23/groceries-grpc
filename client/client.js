const grpc = require('@grpc/grpc-js')
const protoLoader = require('@grpc/proto-loader')

const { PROTO_CONFIG } = require('../utils/proto-config')
const protoPaths = require('../utils/proto-paths')

const App = require('./app')

const HOST = 'localhost:50051'

const productPackageDefinition = protoLoader.loadSync(protoPaths.PRODUCT_PROTO_PATH, PROTO_CONFIG)
const categoryPackageDefinition = protoLoader.loadSync(protoPaths.CATEGORY_PROTO_PATH, PROTO_CONFIG)
const orderPackageDefinition = protoLoader.loadSync(protoPaths.ORDER_PROTO_PATH, PROTO_CONFIG)
const userPackageDefinition = protoLoader.loadSync(protoPaths.USER_PROTO_PATH, PROTO_CONFIG)

const productPackage = grpc.loadPackageDefinition(productPackageDefinition).product
const categoryPackage = grpc.loadPackageDefinition(categoryPackageDefinition).category
const orderPackage = grpc.loadPackageDefinition(orderPackageDefinition).order
const userPackage = grpc.loadPackageDefinition(userPackageDefinition).user

const productClient = new productPackage.ProductService(HOST, grpc.credentials.createInsecure())
const categoryClient = new categoryPackage.CategoryService(HOST, grpc.credentials.createInsecure())
const orderClient = new orderPackage.OrderService(HOST, grpc.credentials.createInsecure())
const userClient = new userPackage.UserService(HOST, grpc.credentials.createInsecure())

const app = new App({ productClient, categoryClient, orderClient, userClient })

app.init()