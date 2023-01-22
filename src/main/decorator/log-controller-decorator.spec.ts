import { mockLogErrorRepository } from '@/data/test'
import { mockAccountModel } from '@/domain/test'
import { ILogErrorRepository } from '../../data/protocols/db/log/i-log-error-repository'
import { ok, serverError } from '../../presentation/helpers/http/http-helper'
import { IController, IHttpRequest, IHttpResponse } from '../../presentation/protocols'
import { LogControllerDecorator } from './log-controller-decorator'

const makeController = (): IController => {
  class ControllerStub implements IController {
    async handle (httpRequest: IHttpRequest): Promise<IHttpResponse> {
      return await new Promise(resolve => resolve(ok(mockAccountModel())))
    }
  }
  return new ControllerStub()
}

interface ISutTypes {
  sut: IController
  controllerStub: IController
  logErrorRepositoryStub: ILogErrorRepository
}

const makeSut = (): ISutTypes => {
  const controllerStub = makeController()
  const logErrorRepositoryStub = mockLogErrorRepository()
  const sut = new LogControllerDecorator(controllerStub, logErrorRepositoryStub)
  return {
    sut,
    controllerStub,
    logErrorRepositoryStub
  }
}

const makeFakeHttpRequest = (): IHttpRequest => ({
  body: {
    name: 'valid_name',
    email: 'valid_email@mail.com',
    password: 'valid_password',
    passwordConfirmation: 'valid_password'
  }
})

describe('Logger Controller Decorator', () => {
  test('Should call controller handle', async () => {
    const { sut, controllerStub } = makeSut()
    const handleSpy = jest.spyOn(controllerStub, 'handle')
    await sut.handle(makeFakeHttpRequest())
    expect(handleSpy).toHaveBeenCalledWith(makeFakeHttpRequest())
  })
  test('Should return the same result of the controller', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(makeFakeHttpRequest())
    expect(httpResponse).toEqual(ok(mockAccountModel()))
  })
  test('Should cal LogErrorRepository with correct error if controller returns a server error', async () => {
    const { sut, controllerStub, logErrorRepositoryStub } = makeSut()
    const fakeError = new Error()
    fakeError.stack = 'any-stack-error'
    const logSpy = jest.spyOn(logErrorRepositoryStub, 'logError')
    jest.spyOn(controllerStub, 'handle').mockReturnValueOnce(
      new Promise(resolve => resolve(serverError(fakeError)))
    )
    await sut.handle(makeFakeHttpRequest())
    expect(logSpy).toHaveBeenCalledWith('any-stack-error')
  })
})
