export const serverError = {
  description: 'Problema no servidor tente novamente mais tarde',
  content: {
    'application/json': {
      schema: {
        $ref: '#/schemas/error'
      }
    }
  }
}
