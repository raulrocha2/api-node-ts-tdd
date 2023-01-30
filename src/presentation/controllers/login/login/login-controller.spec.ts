import { mockAuthentication } from '@/presentation/test'
import { mockValidation } from '@/validation/test'
import { MissingParamError } from '../../../errors'
import { badRequest, ok, serverError, unauthorized } from '../../../helpers/http/http-helper'
import { LoginController } from './login-controller'
import { IAuthentication, IHttpRequest, IValidation } from './login-controller-protocols'

interface ISutTypes {
  sut: LoginController
  validationStub: IValidation
  authenticationStub: IAuthentication
}
const makeSut = (): ISutTypes => {
  const validationStub = mockValidation()
  const authenticationStub = mockAuthentication()
  const sut = new LoginController(authenticationStub, validationStub)
  return {
    sut,
    validationStub,
    authenticationStub
  }
}

const mockRequest = (): IHttpRequest => (
  {
    body: {
      email: 'valid_email@mail.com',
      password: 'valid_password'
    }
  }
)

describe('Login Controller', () => {
  test('Should calls Authentication with correct values', async () => {
    const { sut, authenticationStub } = makeSut()
    const authSpy = jest.spyOn(authenticationStub, 'auth')
    const httpRequest = {
      body: {
        email: 'valid_email@mail.com',
        password: 'valid_password'
      }
    }
    await sut.handle(httpRequest)
    expect(authSpy).toHaveBeenCalledWith({ email: httpRequest.body.email, password: httpRequest.body.password })
  })

  test('Should return 401 if invalid credentials are provided', async () => {
    const { sut, authenticationStub } = makeSut()
    jest.spyOn(authenticationStub, 'auth').mockReturnValueOnce(
      Promise.resolve(null)
    )
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(unauthorized())
  })

  test('Should return 500 if Authentication throws', async () => {
    const { sut, authenticationStub } = makeSut()
    jest.spyOn(authenticationStub, 'auth').mockResolvedValueOnce(
      new Promise((resolve, reject) => reject(new Error()))
    )
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should return 200 if valid credentials are provided', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(ok({ accessToken: 'any_token' }))
  })

  test('Should call Validation with correct value', async () => {
    const { sut, validationStub } = makeSut()
    const validateSpy = jest.spyOn(validationStub, 'validate')
    const httpRequest = mockRequest()
    await sut.handle(httpRequest)
    expect(validateSpy).toHaveBeenCalledWith(httpRequest.body)
  })

  test('Should return 400 if validation returns an error', async () => {
    const { sut, validationStub } = makeSut()
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(
      new MissingParamError('any_error')
    )
    const httpReponse = await sut.handle(mockRequest())
    expect(httpReponse).toEqual(badRequest(new MissingParamError('any_error')))
  })
})
