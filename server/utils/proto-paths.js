const path = require('path')

const PRODUCT_PROTO_PATH = path.resolve(__dirname, '../../proto/product.proto')
const CATEGORY_PROTO_PATH = path.resolve(__dirname, '../../proto/category.proto')
const ORDER_PROTO_PATH = path.resolve(__dirname, '../../proto/order.proto')

module.exports = {
  PRODUCT_PROTO_PATH,
  CATEGORY_PROTO_PATH,
  ORDER_PROTO_PATH
}