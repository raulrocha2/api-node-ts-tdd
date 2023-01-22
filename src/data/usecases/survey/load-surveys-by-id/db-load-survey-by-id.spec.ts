import { mockLoadSurveyByIdRepositorySub } from '@/data/test/mock-db-survey'
import { mockSurveyModel, throwError } from '@/domain/test'
import MockDate from 'mockdate'
import { DbLoadSurveyById } from './db-load-survey-by-id'
import { ILoadSurveyByIdRepository } from './db-load-survey-by-id-protocols'

interface ISutTypes {
  sut: DbLoadSurveyById
  loadSurveyByIdRepository: ILoadSurveyByIdRepository
}

const makeSut = (): ISutTypes => {
  const loadSurveyByIdRepository = mockLoadSurveyByIdRepositorySub()
  const sut = new DbLoadSurveyById(loadSurveyByIdRepository)
  return {
    sut,
    loadSurveyByIdRepository
  }
}

describe('DbLoadSurveyById Usecase', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  test('Should call LoadSurveyByIdRepository with correct id', async () => {
    const { sut, loadSurveyByIdRepository } = makeSut()
    const loadByIdSpy = jest.spyOn(loadSurveyByIdRepository, 'loadById')
    await sut.loadById('valid_id')
    expect(loadByIdSpy).toHaveBeenCalledWith('valid_id')
  })

  test('Should return a survey on success', async () => {
    const { sut } = makeSut()
    const survey = await sut.loadById('valid_id')
    expect(survey).toEqual(mockSurveyModel())
  })

  test('Should return null if LoadSurveyByIdRepository returns null', async () => {
    const { sut, loadSurveyByIdRepository } = makeSut()
    jest.spyOn(loadSurveyByIdRepository, 'loadById').mockReturnValueOnce(
      new Promise(resolve => resolve(null))
    )
    const survey = await sut.loadById('invalid_id')
    expect(survey).toBeNull()
  })

  test('Should throw if LoadSurveyByIdRepository throws', async () => {
    const { loadSurveyByIdRepository, sut } = makeSut()
    jest.spyOn(loadSurveyByIdRepository, 'loadById').mockImplementationOnce(throwError)
    const promise = sut.loadById('invalid_id')
    await expect(promise).rejects.toThrow()
  })
})
