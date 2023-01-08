import { ISurveyModel } from '../models/i-surveys'

export type IAddSurveyModel = Omit<ISurveyModel, 'id'>

export interface IAddSurvey {
  add: (surveyData: IAddSurveyModel) => Promise<void>
}
