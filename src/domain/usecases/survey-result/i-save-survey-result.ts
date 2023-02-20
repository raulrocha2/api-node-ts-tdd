import { ISurveyResultModel } from '../../models/i-survey-result'

export interface ISaveSurveyResultParams {
  surveyId: string
  accountId: string
  answer: string
  date: Date

}

export interface ISaveSurveyResult {
  save: (data: ISaveSurveyResultParams) => Promise<ISurveyResultModel>
}
