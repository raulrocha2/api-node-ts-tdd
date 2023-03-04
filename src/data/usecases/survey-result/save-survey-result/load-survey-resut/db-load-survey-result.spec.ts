import MockDate from 'mockdate'
import { ILaodSurveyResultRepository } from '@/data/protocols/db/survey/i-load-survey-result-repository'
import { mockLoadSurveyResultRepository } from '@/data/test/mock-db-survey'
import { DbLoadSurveyResult } from './db-load-survey-result'
import { mockSurveyResultModel } from '@/domain/test'

interface ISutTypes {
  sut: DbLoadSurveyResult
  loadSurveyResultRepositoryStub: ILaodSurveyResultRepository
}

const makeSut = (): ISutTypes => {
  const loadSurveyResultRepositoryStub = mockLoadSurveyResultRepository()
  const sut = new DbLoadSurveyResult(loadSurveyResultRepositoryStub)
  return {
    loadSurveyResultRepositoryStub,
    sut
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

  test('Should return a surveyResult on success', async () => {
    const { sut } = makeSut()
    const loadResult = await sut.load('any_survey_id')
    expect(loadResult).toEqual(mockSurveyResultModel())
  })
})
