import { IAddSurveyParams } from '@domain/usecases/survey/i-add-survey'

export interface IAddSurveyRepository {
  add: (surveyData: IAddSurveyParams) => Promise<void>
}
