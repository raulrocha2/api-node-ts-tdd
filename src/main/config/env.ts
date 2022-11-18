export default {
  mongoUrl: process.env.MONGO_URL || 'mongodb://localhost:27017/clean-node-api',
  port: process.env.PORT || 5050,
  jwtSecretKey: process.env.JWT_SECRET || 'secret-key-clean-node-api'
}
