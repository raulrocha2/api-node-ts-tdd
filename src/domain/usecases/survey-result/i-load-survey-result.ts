import { ISurveyResultModel } from '../../models/i-survey-result'

export interface ILaodSurveyResult {
  save: (surveyId: string) => Promise<ISurveyResultModel>
}
