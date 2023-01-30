
import { EmailExistsError, MissingParamError, ServerError } from '../../../errors'
import {
  IController,
  IAddAccount,
  IValidation,
  IAuthentication
} from './signup-controller-protocols'
import { SignUpController } from './signup-controller'
import { IHttpRequest } from '../../../protocols/i-http'
import {
  badRequest,
  ok,
  serverError,
  forbidden
} from '../../../helpers/http/http-helper'
import { mockAuthentication, mockAddAccount } from '@/presentation/test'
import { mockValidation } from '@/validation/test'

interface ISutTypes {
  sut: IController
  addAccountStub: IAddAccount
  validationStub: IValidation
  authenticationStub: IAuthentication
}

const mockHttpRequest = (): IHttpRequest => ({
  body: {
    name: 'valid_name',
    email: 'valid_email@mail.com',
    password: 'valid_password',
    passwordConfirmation: 'valid_password'
  }
})

const makeSut = (): ISutTypes => {
  const addAccountStub = mockAddAccount()
  const validationStub = mockValidation()
  const authenticationStub = mockAuthentication()
  const sut = new SignUpController(
    addAccountStub,
    validationStub,
    authenticationStub
  )
  return {
    addAccountStub,
    sut,
    validationStub,
    authenticationStub
  }
}

describe('SignUp Controller', () => {
  test('Should call AddAccoutn with correct values', async () => {
    const { sut, addAccountStub } = makeSut()
    const addSpy = jest.spyOn(addAccountStub, 'add')
    await sut.handle(mockHttpRequest())
    expect(addSpy).toHaveBeenCalledWith({
      name: 'valid_name',
      email: 'valid_email@mail.com',
      password: 'valid_password'
    })
  })

  test('Should return 500 if AddAccount throws', async () => {
    const { sut, addAccountStub } = makeSut()
    jest.spyOn(addAccountStub, 'add').mockImplementationOnce(async () => {
      return await new Promise((_resolve, reject) => reject(new Error()))
    }
    )
    const httpReponse = await sut.handle(mockHttpRequest())
    expect(httpReponse).toEqual(serverError(new ServerError(httpReponse.body)))
    expect(httpReponse.body).toEqual(new ServerError(httpReponse.body))
  })

  test('Should return 403 if AddAccount returns null', async () => {
    const { sut, addAccountStub } = makeSut()
    jest.spyOn(addAccountStub, 'add').mockReturnValueOnce(
      Promise.resolve(null)
    )
    const httpReponse = await sut.handle(mockHttpRequest())
    expect(httpReponse).toEqual(forbidden(new EmailExistsError()))
  })

  test('Should return 200 if valid data is provided', async () => {
    const { sut } = makeSut()
    const httpReponse = await sut.handle(mockHttpRequest())
    expect(httpReponse).toEqual(ok({ accessToken: 'any_token' }))
  })

  test('Should call Validation with correct value', async () => {
    const { sut, validationStub } = makeSut()
    const validateSpy = jest.spyOn(validationStub, 'validate')
    const httpRequest = mockHttpRequest()
    await sut.handle(httpRequest)
    expect(validateSpy).toHaveBeenCalledWith(httpRequest.body)
  })

  test('Should return 400 if validation returns an error', async () => {
    const { sut, validationStub } = makeSut()
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(
      new MissingParamError('any_error')
    )
    const httpReponse = await sut.handle(mockHttpRequest())
    expect(httpReponse).toEqual(badRequest(new MissingParamError('any_error')))
  })

  test('Should calls Authentication with correct values', async () => {
    const { sut, authenticationStub } = makeSut()
    const authSpy = jest.spyOn(authenticationStub, 'auth')
    const httpRequest = {
      body: {
        name: 'valid_name',
        email: 'valid_email@mail.com',
        password: 'valid_password',
        passwordConfirmation: 'valid_password'
      }
    }
    await sut.handle(httpRequest)
    expect(authSpy).toHaveBeenCalledWith({
      email: httpRequest.body.email,
      password: httpRequest.body.password
    })
  })

  test('Should return 500 if Authentication throws', async () => {
    const { sut, authenticationStub } = makeSut()
    jest.spyOn(authenticationStub, 'auth').mockResolvedValueOnce(
      new Promise((resolve, reject) => reject(new Error()))
    )
    const httpResponse = await sut.handle(mockHttpRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })
})
