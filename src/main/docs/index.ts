import { loginPath } from './paths/login-path'
import { accountSchema } from './schemas/account'
import { loginParamsSchema } from './schemas/login-params'

export default {
  openapi: '3.0.0',
  info: {
    title: 'Clean Node API',
    description: 'API curso Mango para criar enquete entre programadores.',
    version: '1.0.0'
  },
  servers: [{
    url: '/api'
  }],
  tags: [{
    name: 'Login'
  }],
  paths: {
    '/login': loginPath
  },
  schemas: {
    account: accountSchema,
    loginParams: loginParamsSchema
  }
}
