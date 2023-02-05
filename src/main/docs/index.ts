import { loginPath } from './paths'
import { accountSchema, errorSchema, loginParamsSchema } from './schemas'
import { badRequest, serverError, unauthorized } from './components'

export default {
  openapi: '3.0.0',
  info: {
    title: 'Clean Node API',
    description: 'API curso Mango para criar enquete entre programadores.',
    version: '1.0.0'
  },
  license: {
    name: 'GPL-3.0-or-later',
    url: ''
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
    loginParams: loginParamsSchema,
    error: errorSchema
  },
  components: {
    badRequest,
    unauthorized,
    serverError
  }
}
