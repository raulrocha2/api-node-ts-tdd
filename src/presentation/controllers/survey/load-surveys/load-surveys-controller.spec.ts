
// import { random, datatype, image } from '@faker-js/faker'
import { LoadSurveysController } from './load-surveys-controller'
import { ILoadSurveys } from './load-surveys-protocols'
import MockDate from 'mockdate'
import { noContent, ok, serverError } from '../../../helpers/http/http-helper'
import { mockSurveysModel } from '@/domain/test'
import { mockLoadSurvey } from '@/presentation/test'

interface ISutTypes {
  sut: LoadSurveysController
  loadSurveysStub: ILoadSurveys
}

const makeSut = (): ISutTypes => {
  const loadSurveysStub = mockLoadSurvey()
  const sut = new LoadSurveysController(loadSurveysStub)
  return {
    sut,
    loadSurveysStub
  }
}

describe('LoadSurveys Controller', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  test('Should call LoadSurveys', async () => {
    const { sut, loadSurveysStub } = makeSut()
    const loadSpy = jest.spyOn(loadSurveysStub, 'load')
    await sut.handle({})
    expect(loadSpy).toHaveBeenCalled()
  })

  test('Should return 200 on success', async () => {
    const { sut } = makeSut()
    const httResponse = await sut.handle({})
    expect(httResponse).toEqual(ok(mockSurveysModel()))
  })

  test('Should return 204 LoadSurveys is empty', async () => {
    const { sut, loadSurveysStub } = makeSut()
    jest.spyOn(loadSurveysStub, 'load').mockResolvedValueOnce(
      new Promise(resolve => resolve([]))
    )
    const httResponse = await sut.handle({})
    expect(httResponse).toEqual(noContent())
  })

  test('Should return 500 if LoadSurveys throws', async () => {
    const { sut, loadSurveysStub } = makeSut()
    jest.spyOn(loadSurveysStub, 'load').mockResolvedValueOnce(
      new Promise((resolve, reject) => reject(new Error()))
    )
    const httpResponse = await sut.handle({})
    expect(httpResponse).toEqual(serverError(new Error()))
  })
})
