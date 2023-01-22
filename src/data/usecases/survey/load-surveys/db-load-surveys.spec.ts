import { ILoadSurveysRepository } from './db-load-surveys-protocols'
import { DbLoadSurveys } from './db-load-surveys'
import MockDate from 'mockdate'
import { mockLoadSurveyRepositorySub } from '@/data/test/mock-db-survey'
import { mockSurveysModel } from '@/domain/test'

interface ISutTypes {
  sut: DbLoadSurveys
  loadSurveysRepository: ILoadSurveysRepository
}

const makeSut = (): ISutTypes => {
  const loadSurveysRepository = mockLoadSurveyRepositorySub()
  const sut = new DbLoadSurveys(loadSurveysRepository)
  return {
    sut,
    loadSurveysRepository
  }
}

describe('DbLoadSurveys Usecase', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  test('Should call LoadSurveysRepository', async () => {
    const { sut, loadSurveysRepository } = makeSut()
    const loadAllSpy = jest.spyOn(loadSurveysRepository, 'loadAll')
    await sut.load()
    expect(loadAllSpy).toHaveBeenCalled()
  })

  test('Should return a list of Surveys on success', async () => {
    const { sut } = makeSut()
    const surveys = await sut.load()
    expect(surveys).toEqual(mockSurveysModel())
  })

  test('Should throw if DbLoadSurveys throws', async () => {
    const { sut, loadSurveysRepository } = makeSut()
    jest.spyOn(loadSurveysRepository, 'loadAll').mockReturnValueOnce(
      new Promise((resolve, reject) => reject(new Error()))
    )
    const promise = sut.load()
    await expect(promise).rejects.toThrow()
  })
})
