
import { DbSaveSurveyResult } from './db-save-survey-result'
import {
  ISaveSurveyResultModel,
  ISurveyResultModel,
  ISaveSurveyResultRepository
} from './db-save-survey-result-protocol'

const makeFakeSurveyResultData = (): ISaveSurveyResultModel => ({
  surveyId: 'any_survey_id',
  accountId: 'any_account_id',
  answer: 'any_answer',
  date: new Date()
})

const makeFakeSurveyResult = (): ISurveyResultModel => Object.assign(
  {}, makeFakeSurveyResultData(), { id: 'any_id' }
)

interface ISutTypes {
  sut: DbSaveSurveyResult
  saveSurveyResultRepositoryStub: ISaveSurveyResultRepository
}

const makeSaveSurveyResultRepository = (): ISaveSurveyResultRepository => {
  class SaveSurveyResultRepositoryStub implements ISaveSurveyResultRepository {
    async save (data: ISaveSurveyResultModel): Promise<ISurveyResultModel> {
      return await new Promise(resolve => resolve(makeFakeSurveyResult()))
    }
  }
  return new SaveSurveyResultRepositoryStub()
}

const makeSut = (): ISutTypes => {
  const saveSurveyResultRepositoryStub = makeSaveSurveyResultRepository()
  const sut = new DbSaveSurveyResult(saveSurveyResultRepositoryStub)
  return {
    sut,
    saveSurveyResultRepositoryStub
  }
}

describe('DbAddSurvey Usecase', () => {
  test('Should call DbSaveSurveyResult with correct values', async () => {
    const { sut, saveSurveyResultRepositoryStub } = makeSut()
    const addSpy = jest.spyOn(saveSurveyResultRepositoryStub, 'save')
    const surveyResultData = makeFakeSurveyResultData()
    await sut.save(surveyResultData)
    expect(addSpy).toHaveBeenCalledWith(surveyResultData)
  })
})
