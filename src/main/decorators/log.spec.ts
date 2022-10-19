import { ILogErrorRepository } from '../../data/protocols/i-log-error-repository'
import { serverError } from '../../presentation/helpers/http-helper'
import { IController, IHttpRequest, IHttpResponse } from '../../presentation/protocols'
import { LogControllerDecorator } from './log'

const makeController = (): IController => {
  class ControllerStub implements IController {
    async handle (httpRequest: IHttpRequest): Promise<IHttpResponse> {
      const httpReponse = {
        body: {
          id: 'valid_id',
          name: 'valid_name',
          email: 'valid_email@mail.com',
          password: 'valid_password'
        },
        statusCode: 200
      }
      return await new Promise(resolve => resolve(httpReponse))
    }
  }
  return new ControllerStub()
}

const makeLogErrorRepository = (): ILogErrorRepository => {
  class LogErrorRepositoryStub implements ILogErrorRepository {
    async log (stack: string): Promise<void> {
      return await new Promise(resolve => resolve())
    }
  }
  return new LogErrorRepositoryStub()
}
interface ISutTypes {
  sut: IController
  controllerStub: IController
  logErrorRepositoryStub: ILogErrorRepository
}

const makeSut = (): ISutTypes => {
  const controllerStub = makeController()
  const logErrorRepositoryStub = makeLogErrorRepository()
  const sut = new LogControllerDecorator(controllerStub, logErrorRepositoryStub)
  return {
    sut,
    controllerStub,
    logErrorRepositoryStub
  }
}

describe('Logger Controller Decorator', () => {
  test('Should call controller handle', async () => {
    const { sut, controllerStub } = makeSut()
    const handleSpy = jest.spyOn(controllerStub, 'handle')
    const httpRequest = {
      body: {
        name: 'valid_name',
        email: 'valid_email@mail.com',
        password: 'valid_password',
        passwordConfimation: 'valid_password'
      }
    }
    await sut.handle(httpRequest)
    expect(handleSpy).toHaveBeenCalledWith(httpRequest)
  })
  test('Should return the same result of the controller', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        name: 'valid_name',
        email: 'valid_email@mail.com',
        password: 'valid_password',
        passwordConfimation: 'valid_password'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual({
      body: {
        id: 'valid_id',
        name: 'valid_name',
        email: 'valid_email@mail.com',
        password: 'valid_password'
      },
      statusCode: 200
    })
  })
  test('Should cal LogErrorRepository with correct error if controller returns a server error', async () => {
    const { sut, controllerStub, logErrorRepositoryStub } = makeSut()
    const fakeError = new Error()
    fakeError.stack = 'any-stack-error'
    const logSpy = jest.spyOn(logErrorRepositoryStub, 'log')
    jest.spyOn(controllerStub, 'handle').mockReturnValueOnce(
      new Promise(resolve => resolve(serverError(fakeError)))
    )
    const httpRequest = {
      body: {
        name: 'valid_name',
        email: 'valid_email@mail.com',
        password: 'valid_password'
      }
    }
    await sut.handle(httpRequest)
    expect(logSpy).toHaveBeenCalledWith('any-stack-error')
  })
})
