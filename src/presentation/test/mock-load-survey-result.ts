import { mockSurveyResultModel } from '@/domain/test'
import { ILaodSurveyResult, ISurveyResultModel } from '../controllers/survey-result/load/load-survey-result-protocols'

export const makeLoadSurveyResultStub = (): ILaodSurveyResult => {
  class LoadSurveyResultStub implements ILaodSurveyResult {
    async load (surveyId: string): Promise<ISurveyResultModel> {
      return await new Promise(resolve => resolve(mockSurveyResultModel()))
    }
  }

  return new LoadSurveyResultStub()
}
