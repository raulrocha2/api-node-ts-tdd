import { ISurveyModel } from '../../models/i-surveys'

export type IAddSurveyParams = Omit<ISurveyModel, 'id'>

export interface IAddSurvey {
  add: (surveyData: IAddSurveyParams) => Promise<void>
}
