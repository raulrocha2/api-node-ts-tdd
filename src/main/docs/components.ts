import { apiKeyAuthSchema } from './schemas/'
import { badRequest, serverError, unauthorized, forbidden } from './components/'

export default {
  securitySchemes: {
    apiKeyAuth: apiKeyAuthSchema
  },
  badRequest,
  unauthorized,
  serverError,
  forbidden

}
