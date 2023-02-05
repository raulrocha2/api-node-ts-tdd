import { loginPath } from './paths'
import {
  accountSchema,
  errorSchema,
  loginParamsSchema,
  surveyAnswerSchema,
  surveySchema,
  surveysSchema,
  apiKeyAuthSchema
} from './schemas'
import { badRequest, serverError, unauthorized, forbidden } from './components'
import { surveysPath } from './paths/surveys-path'

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
  }, {
    name: 'Enquete'
  }],
  paths: {
    '/login': loginPath,
    '/surveys': surveysPath
  },
  schemas: {
    account: accountSchema,
    loginParams: loginParamsSchema,
    surveys: surveysSchema,
    survey: surveySchema,
    surveyAnswer: surveyAnswerSchema,
    error: errorSchema
  },
  components: {
    securitySchemes: {
      apiKeyAuth: apiKeyAuthSchema
    },
    badRequest,
    unauthorized,
    serverError,
    forbidden
  }
}
