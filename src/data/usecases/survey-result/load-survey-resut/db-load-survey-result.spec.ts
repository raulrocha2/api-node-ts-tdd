import MockDate from 'mockdate'
import { ILaodSurveyResultRepository } from '@/data/protocols/db/survey/i-load-survey-result-repository'
import { mockLoadSurveyByIdRepositorySub, mockLoadSurveyResultRepository } from '@/data/test/mock-db-survey'
import { DbLoadSurveyResult } from './db-load-survey-result'
import { mockSurveyResultModel, throwError } from '@/domain/test'
import { ILoadSurveyByIdRepository } from '../save-survey-result/db-save-survey-result-protocols'

interface ISutTypes {
  sut: DbLoadSurveyResult
  loadSurveyResultRepositoryStub: ILaodSurveyResultRepository
  loadSurveyByIdRepositoryStub: ILoadSurveyByIdRepository
}

const makeSut = (): ISutTypes => {
  const loadSurveyResultRepositoryStub = mockLoadSurveyResultRepository()
  const loadSurveyByIdRepositoryStub = mockLoadSurveyByIdRepositorySub()
  const sut = new DbLoadSurveyResult(loadSurveyResultRepositoryStub, loadSurveyByIdRepositoryStub)
  return {
    loadSurveyResultRepositoryStub,
    sut,
    loadSurveyByIdRepositoryStub
  }
}

describe('DbLoadSurveyResult Usecase', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  test('Should call LoadSurveyResultRepository with correct value', async () => {
    const { sut, loadSurveyResultRepositoryStub } = makeSut()
    const loadByIdSpy = jest.spyOn(loadSurveyResultRepositoryStub, 'loadBySurveyId')
    await sut.load('any_survey_id')
    expect(loadByIdSpy).toHaveBeenCalledWith('any_survey_id')
  })

  test('Should call LoadSurveyByIdRepository if LoadSurveyResultRepository return null', async () => {
    const { sut, loadSurveyResultRepositoryStub, loadSurveyByIdRepositoryStub } = makeSut()
    jest.spyOn(loadSurveyResultRepositoryStub, 'loadBySurveyId').mockReturnValueOnce(Promise.resolve(null))
    const loadByIdSpy = jest.spyOn(loadSurveyByIdRepositoryStub, 'loadById')
    await sut.load('any_survey_id')
    expect(loadByIdSpy).toHaveBeenCalledWith('any_survey_id')
  })

  test('Should return a surveyResultModel with count 0 if LoadSurveyResultRepository return null', async () => {
    const { sut, loadSurveyResultRepositoryStub } = makeSut()
    jest.spyOn(loadSurveyResultRepositoryStub, 'loadBySurveyId').mockReturnValueOnce(Promise.resolve(null))
    const loadResult = await sut.load('any_survey_id')
    expect(loadResult).toEqual(mockSurveyResultModel())
  })

  test('Should return a surveyResult on success', async () => {
    const { sut } = makeSut()
    const loadResult = await sut.load('any_survey_id')
    expect(loadResult).toEqual(mockSurveyResultModel())
  })

  test('Should throw if LoadSurveyResultRepository throws', async () => {
    const { sut, loadSurveyResultRepositoryStub } = makeSut()
    jest.spyOn(loadSurveyResultRepositoryStub, 'loadBySurveyId').mockImplementationOnce(throwError)
    const promise = sut.load('any_survey_id')
    await expect(promise).rejects.toThrow()
  })
})
