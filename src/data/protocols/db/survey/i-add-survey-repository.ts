import { IAddSurveyModel } from '@domain/usecases/survey/i-add-survey'

export interface IAddSurveyRepository {
  add: (surveyData: IAddSurveyModel) => Promise<void>
}
