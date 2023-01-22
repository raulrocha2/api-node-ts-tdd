import { IAddSurvey, IAddSurveyParams } from '../controllers/survey/add-survey/add-survey-protocols'

export const mockAddSurvey = (): IAddSurvey => {
  class AddSurveyStub implements IAddSurvey {
    async add (surveyData: IAddSurveyParams): Promise<void> {
      return await new Promise(resolve => resolve())
    }
  }
  return new AddSurveyStub()
}
