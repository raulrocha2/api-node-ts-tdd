import { ISurveyResultModel } from '../../models/i-survey-result'

export interface ILaodSurveyResult {
  load: (surveyId: string) => Promise<ISurveyResultModel>
}
