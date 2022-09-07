export class SignUpController {
  handle (httpRequest: any): any {
    for (const field of ['name', 'email']) {
      if (!httpRequest.body[field]) {
        return {
          statusCode: 400,
          body: new Error(`Missing param: ${field}`)
        }
      }
    }
  }
}
