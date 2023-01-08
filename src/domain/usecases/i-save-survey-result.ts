import { ISurveyResultModel } from '../models/i-survey-result'

export type ISaveSurveyResultModel = Omit<ISurveyResultModel, 'id'>

export interface ISaveSurveyResult {
  save: (data: ISaveSurveyResultModel) => Promise<ISurveyResultModel>
}
