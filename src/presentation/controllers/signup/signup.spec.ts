
import { InvalidParamError, MissingParamError, ServerError } from '../../errors'
import {
  IController,
  IEmailValidator,
  IAccountModel,
  IAddAccount,
  IAddAccountModel,
  IValidation
} from './signup-protocols'
import { SignUpController } from './signup'
import { IHttpRequest } from '../../protocols/i-http'
import { badRequest, ok, serverError } from '../../helpers/http-helper'

interface ISutTypes {
  sut: IController
  emailValidatorStub: IEmailValidator
  addAccountStub: IAddAccount
  validationStub: IValidation
}

const makeFakeAccount = (): IAccountModel => ({
  id: 'valid_id',
  name: 'valid_name',
  email: 'valid_email@mail.com',
  password: 'valid_password'
})

const makeFakeHttpRequest = (): IHttpRequest => ({
  body: {
    name: 'valid_name',
    email: 'valid_email@mail.com',
    password: 'valid_password',
    passwordConfimation: 'valid_password'
  }
})

const makeEmailValidator = (): IEmailValidator => {
  class EmailValidatorStub implements IEmailValidator {
    isValid (email: string): boolean {
      return true
    }
  }
  return new EmailValidatorStub()
}

const makeValidation = (): IValidation => {
  class ValidationStub implements IValidation {
    validate (input: any): Error {
      return null
    }
  }
  return new ValidationStub()
}

const makeAddAccount = (): IAddAccount => {
  class AddAccountStub implements IAddAccount {
    async add (accountData: IAddAccountModel): Promise<IAccountModel> {
      return await new Promise(resolve => resolve(makeFakeAccount()))
    }
  }
  return new AddAccountStub()
}

const makeSut = (): ISutTypes => {
  const emailValidatorStub = makeEmailValidator()
  const addAccountStub = makeAddAccount()
  const validationStub = makeValidation()
  const sut = new SignUpController(emailValidatorStub, addAccountStub, validationStub)
  return {
    emailValidatorStub,
    addAccountStub,
    sut,
    validationStub
  }
}

describe('SignUp Controller', () => {
  test('Should return 400 if no name is provived', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        email: 'any_email@mail.com',
        password: 'any_password',
        passwordConfimation: 'any_password'
      }
    }
    const httpReponse = await sut.handle(httpRequest)
    expect(httpReponse).toEqual(badRequest(new MissingParamError('name')))
  })

  test('Should return 400 if no email is provived', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        name: 'any_name',
        password: 'any_password',
        passwordConfimation: 'any_password'
      }
    }
    const httpReponse = await sut.handle(httpRequest)
    expect(httpReponse).toEqual(badRequest(new MissingParamError('email')))
  })

  test('Should return 400 if no password is provived', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@mail.com',
        passwordConfimation: 'any_password'
      }
    }
    const httpReponse = await sut.handle(httpRequest)
    expect(httpReponse).toEqual(badRequest(new MissingParamError('password')))
  })

  test('Should return 400 if no passwordConfimation is provived', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@mail.com',
        password: 'any_password'
      }
    }
    const httpReponse = await sut.handle(httpRequest)
    expect(httpReponse).toEqual(badRequest(new MissingParamError('passwordConfimation')))
  })

  test('Should return 400 if an invalid email is provived', async () => {
    const { sut, emailValidatorStub } = makeSut()
    jest.spyOn(emailValidatorStub, 'isValid').mockReturnValueOnce(false)
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'invalid-email',
        password: 'any_password',
        passwordConfimation: 'any_password'
      }
    }
    const httpReponse = await sut.handle(httpRequest)
    expect(httpReponse).toEqual(badRequest(new InvalidParamError('invalid-email')))
  })

  test('Should return 400 if passwordConfimation fails', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@mail.com',
        password: 'any_password',
        passwordConfimation: 'wrong_confimation'
      }
    }
    const httpReponse = await sut.handle(httpRequest)
    expect(httpReponse).toEqual(badRequest(new InvalidParamError('passwordConfimation')))
  })

  test('Should call EmailValidator with correct email', async () => {
    const { sut, emailValidatorStub } = makeSut()
    const isValidSpy = jest.spyOn(emailValidatorStub, 'isValid')
    await sut.handle(makeFakeHttpRequest())
    expect(isValidSpy).toHaveBeenCalledWith('valid_email@mail.com')
  })

  test('Should return 500 if EmailValidator throws', async () => {
    const { sut, emailValidatorStub } = makeSut()
    jest.spyOn(emailValidatorStub, 'isValid').mockImplementationOnce(
      () => { throw new Error() }
    )
    const httpReponse = await sut.handle(makeFakeHttpRequest())
    expect(httpReponse).toEqual(serverError(new ServerError(httpReponse.body)))
  })

  test('Should call AddAccoutn with correct values', async () => {
    const { sut, addAccountStub } = makeSut()
    const addSpy = jest.spyOn(addAccountStub, 'add')
    await sut.handle(makeFakeHttpRequest())
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
    const httpReponse = await sut.handle(makeFakeHttpRequest())
    expect(httpReponse).toEqual(serverError(new ServerError(httpReponse.body)))
    expect(httpReponse.body).toEqual(new ServerError(httpReponse.body))
  })

  test('Should return 200 if valid data is provided', async () => {
    const { sut } = makeSut()
    const httpReponse = await sut.handle(makeFakeHttpRequest())
    expect(httpReponse).toEqual(ok(makeFakeAccount()))
  })

  test('Should call Validation with correct value', async () => {
    const { sut, validationStub } = makeSut()
    const validateSpy = jest.spyOn(validationStub, 'validate')
    const httpRequest = makeFakeHttpRequest()
    await sut.handle(httpRequest)
    expect(validateSpy).toHaveBeenCalledWith(httpRequest.body)
  })

  test('Should return 400 if validation returns an error', async () => {
    const { sut, validationStub } = makeSut()
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(
      new MissingParamError('any_error')
    )
    const httpReponse = await sut.handle(makeFakeHttpRequest())
    expect(httpReponse).toEqual(badRequest(new MissingParamError('any_error')))
  })
})
