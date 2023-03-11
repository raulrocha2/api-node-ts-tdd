import { mockSurveyModel } from '@/domain/test'
import { ILoadSurveyById } from '../controllers/survey-result/save/save-survey-result-protocols'
import { ISurveyModel } from '../controllers/survey/load-surveys/load-surveys-protocols'

export const mockSurveyById = (): ILoadSurveyById => {
  class LoadSurveyByIdStub implements ILoadSurveyById {
    async loadById (id: string): Promise<ISurveyModel> {
      return await new Promise(resolve => resolve(mockSurveyModel()))
    }
  }

  return new LoadSurveyByIdStub()
}
