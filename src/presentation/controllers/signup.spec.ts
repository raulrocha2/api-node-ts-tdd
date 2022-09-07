import { SignUpController } from './signup'

describe('SignUp Controller', () => {
  test('Should return 400 if no name is provived', () => {
    const sut = new SignUpController()
    const httpRequest = {
      body: {
        email: 'any_email@mail.com',
        password: 'any_password',
        passwordConfimation: 'any_password'
      }
    }
    const httpReponse = sut.handle(httpRequest)
    expect(httpReponse.statusCode).toBe(400)
  })
})
