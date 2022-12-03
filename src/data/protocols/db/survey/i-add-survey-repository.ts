import { IAddSurveyModel } from '../../../../domain/usecases/i-add-survey'

export interface IAddSurveyRepository {
  add: (surveyData: IAddSurveyModel) => Promise<void>
}
