import { mockSurveysModel } from '@/domain/test'
import { ILoadSurveys, ISurveyModel } from '../controllers/survey/load-surveys/load-surveys-protocols'

export const mockLoadSurvey = (): ILoadSurveys => {
  class LoadSurveysStub implements ILoadSurveys {
    async load (): Promise<ISurveyModel[]> {
      return await new Promise(resolve => resolve(mockSurveysModel()))
    }
  }

  return new LoadSurveysStub()
}
