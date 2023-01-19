import { ISurveyResultModel } from '../../models/i-survey-result'

export type ISaveSurveyResultParams = Omit<ISurveyResultModel, 'id'>

export interface ISaveSurveyResult {
  save: (data: ISaveSurveyResultParams) => Promise<ISurveyResultModel>
}
