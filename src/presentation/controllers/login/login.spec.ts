import { MissingParamError } from '../../errors'
import { badRequest } from '../../helpers/http-helper'
import { IEmailValidator } from '../../protocols'
import { LoginController } from './login'

const makeEmailValidation = (): IEmailValidator => {
  class ValidationStub implements IEmailValidator {
    isValid (email: string): boolean {
      return true
    }
  }
  return new ValidationStub()
}

interface ISutTypes {
  sut: LoginController
  emailValidatorStub: IEmailValidator
}
const makeSut = (): ISutTypes => {
  const emailValidatorStub = makeEmailValidation()
  const sut = new LoginController(emailValidatorStub)
  return {
    sut,
    emailValidatorStub
  }
}

describe('Login Controller', () => {
  test('Should return 400 if no email is provider', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        password: 'any_password'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('email')))
  })

  test('Should return 400 if no password is provider', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        email: 'any_email@mail.com'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('password')))
  })

  test('Should call EmailValidator with correct email', async () => {
    const { sut, emailValidatorStub } = makeSut()
    const validateSpy = jest.spyOn(emailValidatorStub, 'isValid').mockReturnValueOnce(
      await new Promise(resolve => resolve(false))
    )
    const httpRequest = {
      body: {
        email: 'wrong_email',
        password: 'any_password'
      }
    }
    await sut.handle(httpRequest)
    expect(validateSpy).toHaveBeenCalledWith('wrong_email')
  })
})
